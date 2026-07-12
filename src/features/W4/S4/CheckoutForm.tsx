import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ShippingStep } from "./ShippingStep";
import { ContactStep } from "./ContactStep";
import { PaymentStep } from "./PaymentStep";
import { ReviewStep } from "./ReviewStep";
import "./CheckoutForm.css";

const checkoutSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  fullName: z.string().min(1, "Full name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  paymentMethod: z.enum(["card", "paypal"]),
  cardNumber: z.string().min(16, "Card number must be at least 16 digits"),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;

const steps = [
  {
    title: "Contact",
    fields: ["email", "fullName"],
  },
  {
    title: "Shipping",
    fields: ["address", "city"],
  },
  {
    title: "Payment",
    fields: ["paymentMethod", "cardNumber"],
  },
  {
    title: "Review",
    fields: [],
  },
] as const;

export function CheckoutForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      fullName: "",
      address: "",
      city: "",
      paymentMethod: "card",
      cardNumber: "",
    },
    mode: "onTouched",
  });

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  async function goNext() {
    const fields = steps[currentStep].fields;

    const isValid = await trigger(fields);

    if (!isValid) {
      return;
    }

    setCurrentStep((step) => step + 1);
  }

  function goBack() {
    setCurrentStep((step) => step - 1);
  }

  async function onSubmit(values: CheckoutValues) {
    await fakeCheckout(values);
    alert("Order submitted");
  }

  return (
    <main className="checkout-page">
      <form className="checkout-shell" onSubmit={handleSubmit(onSubmit)} noValidate>
        <header className="checkout-header">
          <p>Secure checkout</p>
          <h1>Complete your order</h1>
        </header>

        <ol className="checkout-steps" aria-label="Checkout progress">
          {steps.map((step, index) => (
            <li
              className={
                index === currentStep
                  ? "checkout-steps__item checkout-steps__item--active"
                  : index < currentStep
                    ? "checkout-steps__item checkout-steps__item--complete"
                    : "checkout-steps__item"
              }
              key={step.title}
            >
              <span>{index + 1}</span>
              {step.title}
            </li>
          ))}
        </ol>

        <section className="checkout-card">
          <div className="checkout-card__title">
            <p>
              Step {currentStep + 1} of {steps.length}
            </p>
            <h2>{steps[currentStep].title}</h2>
          </div>

          {currentStep === 0 && <ContactStep register={register} errors={errors} />}

          {currentStep === 1 && <ShippingStep register={register} errors={errors} />}

          {currentStep === 2 && <PaymentStep register={register} errors={errors} />}

          {currentStep === 3 && <ReviewStep values={getValues()} />}
        </section>

        <div className="checkout-actions">
          {!isFirstStep && (
            <button
              className="checkout-button checkout-button--secondary"
              type="button"
              onClick={goBack}
            >
              Back
            </button>
          )}

          {!isLastStep && (
            <button
              className="checkout-button checkout-button--primary"
              type="button"
              onClick={goNext}
            >
              Next
            </button>
          )}

          {isLastStep && (
            <button className="checkout-button checkout-button--primary" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit order"}
            </button>
          )}
        </div>
      </form>
    </main>
  );
}

async function fakeCheckout(values: CheckoutValues) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  console.log(values);
}
