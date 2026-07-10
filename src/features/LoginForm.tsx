import { useState, type SubmitEvent } from "react";
import "./LoginForm.css";

type LoginValue = {
    email: string;
    password: string;
}

type LoginError = {
    email?: string;
    password?: string;
    root?: string;
}

async function fakeLogin(values: LoginValue) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (values.email !== "admin@example.com" || values.password !== "password123") {
    throw new Error("Invalid credentials");
  }
}

export const LoginForm: React.FC = () => {
    const [values, setValues] = useState<LoginValue>({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState<LoginError>({})
    const [touched, setTouched] = useState<Partial<Record<keyof LoginValue, boolean>>>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const emailError = touched?.email || errors?.root ? errors.email : undefined;
    const passwordError = touched?.password || errors?.root ? errors.password : undefined;

    const validate = (fields: LoginValue) => {
        const nextErrors: LoginError = {};

        if(!fields.email) {
            nextErrors.email = "Email is required";
        } else if (!fields.email.includes('@')) {
            nextErrors.email = "Email is invalid";
        }

        if(!fields.password) {
            nextErrors.password = "Password is required";
        } else if(fields.password.length < 8) {
            nextErrors.password = "Password must be at least 8 charcters"
        }

        return nextErrors;
    }

    const updateField = (name: keyof LoginValue, value: string) => {
        setValues((currentValues) => ({
            ...currentValues,
            [name]: value
        }));
        setErrors((currentErrors) => ({
            ...currentErrors,
            root: undefined
        }));
    }

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({
      email: true,
      password: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      await fakeLogin(values);

      alert("Logged in successfully");
    } catch {
      setErrors({
        root: "Invalid email or password",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

   return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <div className="login-card__header">
          <p>Welcome back</p>
          <h1>Log in to your account</h1>
        </div>

        {errors.root && (
          <p className="login-card__root-error" role="alert">
            {errors.root}
          </p>
        )}

        <div className="login-card__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            onBlur={() =>
              setTouched((currentTouched) => ({
                ...currentTouched,
                email: true,
              }))
            }
            placeholder="admin@example.com"
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? "email-error" : undefined}
          />
          {emailError && (
            <p className="login-card__field-error" id="email-error" role="alert">
              {emailError}
            </p>
          )}
        </div>

        <div className="login-card__field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={values.password}
            onChange={(event) => updateField("password", event.target.value)}
            onBlur={() =>
              setTouched((currentTouched) => ({
                ...currentTouched,
                password: true,
              }))
            }
            placeholder="password123"
            aria-invalid={Boolean(passwordError)}
            aria-describedby={passwordError ? "password-error" : undefined}
          />
          {passwordError && (
            <p className="login-card__field-error" id="password-error" role="alert">
              {passwordError}
            </p>
          )}
        </div>

        <button className="login-card__submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>
    </main>
  );
}
