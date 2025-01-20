export const fieldTypeArray = [
	'text', // Short text field for a name, message, word, etc.
	'textarea', // For longer text inputs
	'select', // Single-select dropdown
	'comboBox', // Single-select dropdown with search
	'comboBoxShad', // Shadcn Single-select dropdown with search
	'date', // Date picker
	'currency',
	'component',
	'time', // Time picker
	'switch', // Switch for binary choices
	'radioGroup', // For selecting one option out of many
	'checkboxGroup', // For selecting multiple options
	'file', // For file uploads
	'number', // Numeric input with increments
	'groupLabel',
	'percent',
	'password'
] as const;
