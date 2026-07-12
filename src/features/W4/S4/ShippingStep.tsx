import type { StepProps } from "./ContactStep";

export function ShippingStep({ register, errors }: StepProps) {
  return (
    <div className="checkout-fields">
      <div className="checkout-field">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          autoComplete="street-address"
          {...register("address")}
          aria-invalid={Boolean(errors.address)}
          aria-describedby={errors.address ? "address-error" : undefined}
        />
        {errors.address && (
          <p className="checkout-field__error" id="address-error" role="alert">
            {errors.address.message}
          </p>
        )}
      </div>

      <div className="checkout-field">
        <label htmlFor="city">City</label>
        <input
          id="city"
          autoComplete="address-level2"
          {...register("city")}
          aria-invalid={Boolean(errors.city)}
          aria-describedby={errors.city ? "city-error" : undefined}
        />
        {errors.city && (
          <p className="checkout-field__error" id="city-error" role="alert">
            {errors.city.message}
          </p>
        )}
      </div>
    </div>
  );
}
