import type { FieldErrors, UseFormRegister } from "react-hook-form";

export type CheckoutValues = {
  email: string;
  fullName: string;
  address: string;
  city: string;
  paymentMethod: "card" | "paypal";
  cardNumber: string;
};

export type StepProps = {
  register: UseFormRegister<CheckoutValues>;
  errors: FieldErrors<CheckoutValues>;
};

export function ContactStep({ register, errors }: StepProps) {
  return (
    <div className="checkout-fields">
      <div className="checkout-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p className="checkout-field__error" id="email-error" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="checkout-field">
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          autoComplete="name"
          {...register("fullName")}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
        />
        {errors.fullName && (
          <p className="checkout-field__error" id="fullName-error" role="alert">
            {errors.fullName.message}
          </p>
        )}
      </div>
    </div>
  );
}
