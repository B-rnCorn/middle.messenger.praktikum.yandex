declare module '*.hbs' {
    const tpl: (param?: any) => string
    export default tpl
}

declare module "handlebars/dist/handlebars.runtime"