import style from './FormControlls.module.css'
import React from 'react'
import {WrappedFieldMetaProps} from "redux-form";

type FormsControlsParamsType = {
    input: any
    meta: WrappedFieldMetaProps
    props: any
}

export const FormElement = (Element: string) => (props: FormsControlsParamsType) => {
    const hasError = props.meta.touched && props.meta.error
    return (
        <div className={ hasError ? style.error : ''}>
            <div>
                {hasError ? <span>{props.meta.error}</span> : null}
            </div>
            <Element {...props.input} {...props}/>
        </div>
    )
}

