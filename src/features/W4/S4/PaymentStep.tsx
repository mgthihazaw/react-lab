import type { StepProps } from "./ContactStep";

export function PaymentStep({ register, errors }: StepProps) {
  return (
    <div className="checkout-fields">
      <div className="checkout-field">
        <label htmlFor="paymentMethod">Payment method</label>
        <select id="paymentMethod" {...register("paymentMethod")}>
          <option value="card">Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      <div className="checkout-field">
        <label htmlFor="cardNumber">Card number</label>
        <input
          id="cardNumber"
          inputMode="numeric"
          {...register("cardNumber")}
          aria-invalid={Boolean(errors.cardNumber)}
          aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
        />
        {errors.cardNumber && (
          <p className="checkout-field__error" id="cardNumber-error" role="alert">
            {errors.cardNumber.message}
          </p>
        )}
      </div>
    </div>
  );
}
