import React, {
    useState,
    ChangeEvent,
    FormEvent,
    useEffect,
    useReducer,
    useContext,
    useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

interface LoginProps {
    onLogin: (email: any, password: any) => void;
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
        isValid: false,
    });

    const authCtx = useContext(AuthContext);

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(emailIsValid && passwordIsValid);
        }, 500);

        return () => {
            clearTimeout(identifier);
        };
    }, [emailIsValid, passwordIsValid]);

    const emailChangeHandler = (event: any) => {
        dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    };

    const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: "INPUT_BLUR" });
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formIsValid) {
            authCtx.onLogin(emailState.value, passwordState.value);
        } else if (!emailIsValid) {
            if (emailInputRef.current !== undefined) {
                emailInputRef.current.activate();
            }
        } else {
            passwordInputRef.current.activate()
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    id="email"
                    label="E-Mail"
                    type="email"
                    isValid={emailIsValid}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
                <Input
                    ref={passwordInputRef}
                    id="password"
                    label="Password"
                    type="password"
                    isValid={passwordIsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
