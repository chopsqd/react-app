import style from './FormControlls.module.css'

export const FormElement = Element => ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={ hasError ? style.error : ''}>
            <div>
                {hasError ? <span>{meta.error}</span> : null}
            </div>
            <Element {...input} {...props}/>
        </div>
    )
}

