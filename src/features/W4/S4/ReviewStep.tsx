import type { CheckoutValues } from "./CheckoutForm";

export function ReviewStep({ values }: { values: CheckoutValues }) {
  return (
    <div className="checkout-review">
      <h3>Review your order</h3>

      <dl>
        <dt>Email</dt>
        <dd>{values.email}</dd>

        <dt>Full name</dt>
        <dd>{values.fullName}</dd>

        <dt>Address</dt>
        <dd>{values.address}</dd>

        <dt>City</dt>
        <dd>{values.city}</dd>

        <dt>Payment method</dt>
        <dd>{values.paymentMethod}</dd>
      </dl>
    </div>
  );
}
