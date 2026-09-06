import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Copy, Globe2, Linkedin, Mail, Pencil } from "lucide-react";
import { supabase, type BrandLead, type MailStatus } from "@/lib/supabase";

const statusValues: MailStatus[] = ["Pending", "Complete", "Success"];

export function badgeClass(value: string | null | undefined) {
  if (value === "Pending") return "pending";
  if (value === "Complete") return "complete";
  if (value === "Success") return "success";
  return "priority";
}

export function fmt(value: unknown) {
  return value === null || value === undefined || value === "" ? "—" : String(value);
}

function linkHref(href: string) {
  return /^https?:\/\//i.test(href) ? href : `https://${href}`;
}

async function copy(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  } catch {
    toast.error(`Could not copy ${label.toLowerCase()}`);
  }
}

export function LeadDetails({
  lead,
  onChanged,
  mobileOpen = false,
  onMobileClose,
}: {
  lead: BrandLead | null;
  onChanged: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const [mail, setMail] = useState<MailStatus>("Pending");
  const [savingMail, setSavingMail] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);

  useEffect(() => {
    setMail((lead?.mail as MailStatus) ?? "Pending");
    setSubject(lead?.email_subject ?? "");
    setBody(lead?.email_body ?? "");
    setEditingEmail(false);
  }, [lead?.id, lead?.mail, lead?.email_subject, lead?.email_body]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.classList.add("mobile-details-active");
    return () => document.body.classList.remove("mobile-details-active");
  }, [mobileOpen]);

  if (!lead) {
    return (
      <aside className="details-panel" aria-label="Lead details">
        <div className="empty-state">
          <div className="empty-icon">✦</div>
          <h3>Select a brand</h3>
          <p>Click any lead to view its full details and change the mail status.</p>
        </div>
      </aside>
    );
  }

  async function saveMail() {
    if (!lead) return;
    setSavingMail(true);
    const { error } = await supabase
      .from("brand_leads")
      .update({ mail, updated_at: new Date().toISOString() })
      .eq("id", lead.id);
    setSavingMail(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Mail status: ${lead.mail ?? "—"} → ${mail}`);
    onChanged();
  }

  async function saveEmail() {
    if (!lead) return;
    setSavingEmail(true);
    const { error } = await supabase
      .from("brand_leads")
      .update({
        email_subject: subject,
        email_body: body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", lead.id);
    setSavingEmail(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setEditingEmail(false);
    toast.success("Email draft saved");
    onChanged();
  }

  return (
    <aside className={`details-panel${mobileOpen ? " mobile-open" : ""}`} aria-label={`${fmt(lead.company_name)} details`}>
      <div className="mobile-details-nav">
        <button className="mobile-back-btn" type="button" onClick={onMobileClose}>
          <ArrowLeft aria-hidden="true" />
          <span>Leads</span>
        </button>
        <span>Lead details</span>
      </div>
      <div className="details-header">
        <div className="details-title">
          <div>
            <h2>{fmt(lead.company_name)}</h2>
            <p>
              {fmt(lead.industry)} · {fmt(lead.company_stage)}
            </p>
          </div>
          <span className={`badge ${badgeClass(lead.mail)}`}>{fmt(lead.mail)}</span>
        </div>
      </div>
      <div className="details-body">
        <div className="detail-section">
          <h4>Mail status</h4>
          <div className="status-editor">
            <select
              className="control"
              value={mail}
              onChange={(e) => setMail(e.target.value as MailStatus)}
            >
              {statusValues.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <button className="btn primary" onClick={saveMail} disabled={savingMail}>
              {savingMail ? "Saving…" : "Save"}
            </button>
          </div>
          <div className="muted status-help">
            Pending → Complete → Success. The Supabase trigger keeps the corresponding tables
            synchronized.
          </div>
        </div>

        <div className="detail-section">
          <div className="section-head">
            <h4>Email draft</h4>
            <div className="section-actions">
              <button
                className="btn small secondary"
                onClick={() => copy(subject ?? "", "Subject")}
                disabled={!subject}
              >
                <Copy aria-hidden="true" /> <span>Subject</span>
              </button>
              <button
                className="btn small secondary"
                onClick={() => copy(body ?? "", "Body")}
                disabled={!body}
              >
                <Copy aria-hidden="true" /> <span>Body</span>
              </button>
              <button
                className="btn small secondary"
                onClick={() => copy(`${subject ?? ""}\n\n${body ?? ""}`.trim(), "Email")}
                disabled={!subject && !body}
              >
                <Copy aria-hidden="true" /> <span>Both</span>
              </button>
              <button
                className="btn small secondary"
                onClick={() => {
                  if (editingEmail) {
                    setSubject(lead.email_subject ?? "");
                    setBody(lead.email_body ?? "");
                  }
                  setEditingEmail(!editingEmail);
                }}
              >
                {editingEmail ? null : <Pencil aria-hidden="true" />} <span>{editingEmail ? "Cancel" : "Edit"}</span>
              </button>
            </div>
          </div>
          {editingEmail ? (
            <>
              <div className="field full email-subject-field">
                <label htmlFor="emailSubject">Subject</label>
                <input
                  id="emailSubject"
                  className="email-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="field full">
                <label htmlFor="emailBody">Body</label>
                <textarea
                  id="emailBody"
                  className="email-area"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
              <div className="section-actions email-save-actions">
                <button className="btn primary small" onClick={saveEmail} disabled={savingEmail}>
                  {savingEmail ? "Saving…" : "Save email"}
                </button>
              </div>
            </>
          ) : (
            <div className="field-grid">
              <div className="field full">
                <label>Subject</label>
                <div className="value pre">{fmt(lead.email_subject)}</div>
              </div>
              <div className="field full">
                <label>Body</label>
                <div className="value pre">{fmt(lead.email_body)}</div>
              </div>
            </div>
          )}
        </div>

        <div className="detail-section">
          <h4>Quick links</h4>
          <div className="link-row">
            {lead.website ? (
              <a
                className="link"
                href={linkHref(lead.website)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe2 aria-hidden="true" /> Website
              </a>
            ) : null}
            {lead.linkedin ? (
              <a
                className="link"
                href={linkHref(lead.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin aria-hidden="true" /> LinkedIn
              </a>
            ) : null}
            {lead.email ? (
              <a className="link" href={`mailto:${lead.email}`}>
                <Mail aria-hidden="true" /> Email
              </a>
            ) : null}
          </div>
        </div>

        <div className="detail-section">
          <h4>Lead signals</h4>
          <div className="field-grid">
            <Field label="Lead score" value={lead.lead_score} />
            <Field label="Influencer fit" value={lead.influencer_fit_score} />
            <Field label="Priority" value={lead.priority} />
            <Field label="Budget potential" value={lead.budget_potential} />
          </div>
        </div>

        <div className="detail-section">
          <h4>Company</h4>
          <div className="field-grid">
            <Field label="Contact" value={lead.contact_person} />
            <Field label="Role" value={lead.contact_role} />
            <Field label="Email" value={lead.email} />
            <Field label="Phone" value={lead.phone} />
            <Field label="Product" value={lead.product} full />
          </div>
        </div>

        <div className="detail-section">
          <h4>Why now</h4>
          <div className="field">
            <div className="value pre">{fmt(lead.why_now)}</div>
          </div>
        </div>

        <div className="detail-section">
          <h4>Growth signals</h4>
          <div className="field-grid">
            <Field label="Recent funding" value={lead.recent_funding} full />
            <Field label="Recent launch" value={lead.recent_launch} full />
            <Field label="Marketing activity" value={lead.marketing_activity} full />
            <Field label="Creator activity" value={lead.existing_creator_activity} full />
            <Field label="Next action" value={lead.next_action} full />
          </div>
        </div>
      </div>
    </aside>
  );
}

function Field({ label, value, full }: { label: string; value: unknown; full?: boolean }) {
  return (
    <div className={full ? "field full" : "field"}>
      <label>{label}</label>
      <div className="value pre">{fmt(value)}</div>
    </div>
  );
}
