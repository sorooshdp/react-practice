import React, {
    useState,
    ChangeEvent,
    FormEvent,
    useEffect,
    useReducer,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

interface LoginProps {
    onLogin: (email: string, password: string) => void;
}

const emailReducer = (state: any, action: any) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.includes("@") };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.includes("@") };
    }
    return { value: "", isValid: false };
};

const passwordReducer = (state: any, action: any) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: "", isValid: false };
};
const Login: React.FC<LoginProps> = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState<string>("");
    // const [emailIsValid, setEmailIsValid] = useState<boolean | undefined>();
    // const [enteredPassword, setEnteredPassword] = useState<string>("");
    // const [passwordIsValid, setPasswordIsValid] = useState<
    //     boolean | undefined
    // >();
    const [formIsValid, setFormIsValid] = useState<boolean>(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: "",
        isValid: false,
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: "",
        isValid: false
    });

    const { isValid : emailIsValid } = emailState;
    const { isValid : passwordIsValid } = passwordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
                emailIsValid && passwordIsValid
            );
        }, 500);

        return () => {
            clearTimeout(identifier);
        };
    }, [emailIsValid, passwordIsValid]);

    const emailChangeHandler = (event: any) => {
        dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    };

    const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatchPassword({type: "USER_INPUT", val: event.target.value})
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({type: "INPUT_BLUR"})
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formIsValid) {
            props.onLogin(emailState.value, passwordState.value);
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ""
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordState.isValid === false ? classes.invalid : ""
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        type="submit"
                        className={classes.btn}
                        disabled={!formIsValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
