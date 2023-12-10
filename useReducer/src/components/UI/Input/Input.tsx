import React, {
    ReactNode,
    useRef,
    useEffect,
    Ref,
    RefObject,
    useImperativeHandle,
    LegacyRef,
} from "react";
import classes from "./Input.module.css";
// interface InputProps {
//     value: string;
//     type: string;
//     id: string;
//     label: ReactNode;
//     onChange: (event: any) => void;
//     onBlur: () => void;
//     isValid: boolean;
//     ref: LegacyRef<HTMLInputElement> | undefined ;
// }
const Input = React.forwardRef((props: any, ref: any) => {
    const inputRef = useRef();
    const activate = () => {
        if (inputRef.current !== undefined) {
            inputRef.current.focus();
        }
    };

    useImperativeHandle(ref, () => {
        return {
            focus: activate,
        };
    });
    return (
        <>
            <div
                className={`${classes.control} ${
                    props.isValid === false ? classes.invalid : ""
                }`}
            >
                <label htmlFor={props.id}>{props.label}</label>
                <input
                    ref={inputRef}
                    type={props.type}
                    id={props.id}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                />
            </div>
        </>
    );
});

export default Input;
