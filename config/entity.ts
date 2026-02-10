import { MessageSquare } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type FieldType =
  | 'text'
  | 'rich-text'
  | 'number'
  | 'currency'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'select'
  | 'multi-select'
  | 'tags'
  | 'url'
  | 'email'

export interface EntityField {
  name: string
  label: string
  type: FieldType
  required: boolean
  placeholder?: string
  description?: string
  options?: string[]
  defaultValue?: string | number | boolean
  showInList?: boolean
  showInForm?: boolean
}

export interface EntityConfig {
  name: string
  pluralName: string
  slug: string
  icon: LucideIcon
  fields: EntityField[]
  titleField: string
  descriptionField?: string
  defaultSort: { field: string; direction: 'asc' | 'desc' }
  allowCreate: boolean
  allowEdit: boolean
  allowDelete: boolean
  allowExport: boolean
}

export const entityConfig: EntityConfig = {
  name: 'Feedback',
  pluralName: 'Feedback',
  slug: 'feedback',
  icon: MessageSquare,

  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      placeholder: 'Summarize the feedback',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      required: true,
      options: ['bug_report', 'feature_request', 'general_feedback'],
      defaultValue: 'bug_report',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: ['new', 'triaged', 'in_progress', 'resolved', 'closed'],
      defaultValue: 'new',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      required: false,
      options: ['low', 'medium', 'high', 'critical'],
      defaultValue: 'medium',
      showInList: true,
      showInForm: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'rich-text',
      required: false,
      placeholder: 'Detailed description of the bug or request',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'screenshot_url',
      label: 'Screenshot URL',
      type: 'url',
      required: false,
      placeholder: 'https://cdn.snapfeedback.io/screenshots/...',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'submitter_email',
      label: 'Submitter Email',
      type: 'email',
      required: false,
      placeholder: 'user@example.com',
      showInList: false,
      showInForm: true,
    },
    {
      name: 'submitted_at',
      label: 'Submitted At',
      type: 'datetime',
      required: true,
      showInList: false,
      showInForm: false,
    }
  ],

  titleField: 'title',
  descriptionField: 'description',
  defaultSort: { field: 'submitted_at', direction: 'desc' },

  allowCreate: true,
  allowEdit: true,
  allowDelete: true,
  allowExport: false,
}

export function getListFields(): EntityField[] {
  return entityConfig.fields.filter((f) => f.showInList !== false)
}

export function getFormFields(): EntityField[] {
  return entityConfig.fields.filter((f) => f.showInForm !== false)
}

export function fieldTypeToSql(type: FieldType): string {
  const mapping: Record<FieldType, string> = {
    text: 'TEXT',
    'rich-text': 'TEXT',
    number: 'INTEGER',
    currency: 'NUMERIC(10,2)',
    date: 'DATE',
    datetime: 'TIMESTAMPTZ',
    boolean: 'BOOLEAN DEFAULT FALSE',
    select: 'TEXT',
    'multi-select': 'TEXT[]',
    tags: 'TEXT[]',
    url: 'TEXT',
    email: 'TEXT',
  }
  return mapping[type] || 'TEXT'
}

export function fieldTypeToZod(field: EntityField): string {
  const base: Record<FieldType, string> = {
    text: 'z.string()',
    'rich-text': 'z.string()',
    number: 'z.coerce.number()',
    currency: 'z.coerce.number()',
    date: 'z.string()',
    datetime: 'z.string()',
    boolean: 'z.boolean()',
    select: `z.enum([${field.options?.map((o) => `'${o}'`).join(', ') || "'draft'"}])`,
    'multi-select': 'z.array(z.string())',
    tags: 'z.array(z.string())',
    url: 'z.string().url()',
    email: 'z.string().email()',
  }
  let schema = base[field.type] || 'z.string()'
  if (!field.required) {
    schema += '.optional()'
  }
  return schema
}
