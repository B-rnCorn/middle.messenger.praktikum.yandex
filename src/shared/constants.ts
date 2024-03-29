export const REGULAR_EXPRESSION_PATTERNS: Record<string, string> = {
    firstName: '^[A-ZА-Я]{1}[a-zа-я]+?(-[A-ZА-Я]{1}[a-zа-я]+)?$',
    secondName: '^[A-ZА-Я]{1}[a-zа-я]+?(-[A-ZА-Я]{1}[a-zа-я]+)?$',
    displayName: '^[A-ZА-Я]{1}[a-zа-я]+?(-[A-ZА-Я]{1}[a-zа-я]+)?$',
    login: '^[a-z0-9_-]{6,20}$',
    email: '^[\\w-]+@([A-Za-z\\.]+){1,2}[A-Za-z]+$',
    password: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$',
    phone: '^[\+]?[0-9]{10,15}$',
}

export const REGULAR_EXPRESSION_VALIDATION_TEXT: Record<string, string> = {
    firstName: 'Должно начинаться с большой буквы и содержать латиницу или кириллицу',
    secondName: 'Должно начинаться с большой буквы и содержать латиницу и кириллицу',
    login: 'Должен содержать латинские буквы, дефис и знаки подчеркивания. Длина 6 - 20 символов',
    email: 'Должен иметь вид examaple@mailbox.com',
    password: 'Должен содержать латиницу, минимум одну заглавную букву и цифру. Длина 8 - 40 символов',
    phone: 'Может начинаться со знака +. Длина 10 - 15 символов',
}
