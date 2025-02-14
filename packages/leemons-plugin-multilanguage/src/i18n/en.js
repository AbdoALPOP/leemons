module.exports = {
  forms: {
    unknown_error: 'Unknown error',
    required: 'The field is required',
    email: 'Not a valid email',
    phone: 'Invalid phone',
    numbers: 'Only numbers are allowed',
    minLength: 'The field cannot be less than {limit} characters',
    maxLength: 'The field cannot be longer than {limit} characters',
    minItems: 'It must have a minimum of {limit} elements',
    maxItems: 'It must have a maximum of {limit} elements',
    format: {
      email: 'Not a valid email',
      uri: 'Not a valid url',
      numbers: 'Only numbers are allowed',
      phone: 'Invalid phone',
    },
    selectionRequired: 'Must select an option',
  },
  request_errors: {
    permission_error:
      'A {permissionName} permit is required with one of the following {actions} actions',
  },
  page_header: {
    new: 'New',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
  },
  form_field_types: {
    view: 'View',
    edit: 'Edit',
    save: 'Save',
    text_field: 'Text field',
    rich_text: 'Rich text',
    number: 'Number',
    date: 'Date',
    email: 'Email',
    phone: 'Phone',
    link: 'Link',
    archive: 'Archive',
    multioption: 'Multi-option',
    checkbox: 'Checkbox',
    select: 'Select',
    boolean: 'Boolean',
    user: 'User',
    multioption_types: {
      dropdown: 'Dropdown (+chips)',
      checkboxs: 'Checkboxes',
      radio: 'Radio buttons',
    },
    boolean_types: {
      checkbox: 'Checkbox',
      radio: 'Radio buttons',
      switcher: 'Switcher',
    },
    boolean_initial_status: {
      yes: 'Yes',
      no: 'No',
      nothing: 'No selection',
    },
  },
  translation: {
    label: 'Translations',
    help: 'Untranslated content will appear in the default language',
    title: 'Configuration & languages',
  },
  formWithTheme: {
    add: 'Add',
  },
};
