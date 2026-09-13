ALTER TABLE subscriptions
DROP CONSTRAINT IF EXISTS subscriptions_plan_check;

ALTER TABLE subscriptions
ADD CONSTRAINT subscriptions_plan_check CHECK (plan IN ('free', 'creator_plus', 'creator_pro', 'agency_plus', 'agency_pro'));

-- If the unique constraint doesn't exist on workspace_id:
-- Wait, let's just do an update where exists, or delete and insert.
-- We can just run the migration logic.

-- Migrate existing manual approvals to real subscriptions
-- We first update existing subscriptions if they match
UPDATE subscriptions s
SET plan = CASE 
    WHEN sr.requested_plan = 'pro' THEN 'creator_pro'
    WHEN sr.requested_plan = 'agency' THEN 'agency_pro'
    ELSE 'free'
  END,
  status = 'active',
  provider = 'manual_migration'
FROM subscription_requests sr
WHERE sr.workspace_id = s.workspace_id AND sr.status = 'approved';

-- Then insert for any approved requests that don't have a subscription yet
INSERT INTO subscriptions (workspace_id, plan, status, provider)
SELECT workspace_id, 
  CASE 
    WHEN requested_plan = 'pro' THEN 'creator_pro'
    WHEN requested_plan = 'agency' THEN 'agency_pro'
    ELSE 'free'
  END, 
  'active', 
  'manual_migration'
FROM subscription_requests
WHERE status = 'approved' AND workspace_id NOT IN (SELECT workspace_id FROM subscriptions);

-- Migrate legacy plans directly in the subscriptions table
UPDATE subscriptions SET plan = 'creator_pro' WHERE plan = 'pro';
UPDATE subscriptions SET plan = 'agency_pro' WHERE plan = 'agency';
