import React from "react";

const RefundAndReturnPolicy = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-gray-800">
        <h1 className="text-3xl font-semibold text-center text-orange-600 mb-8">
          Shipping Policy{" "}
        </h1>

        <section className="space-y-8">
          <div>
            {/* <h2 className="text-2xl font-medium text-orange-600">
              Introduction
            </h2> */}
            <p className="mt-4 text-lg">
              Processing Time All orders are delivered within 1-2 hours. Orders
              are not shipped or delivered on weekends or holidays. If we are
              experiencing a high volume of orders, shipments may be delayed by
              a few hours.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-orange-600">
              Return and Refund policy
            </h2>
            <p className="mt-4 text-lg">
              Return We have a 2 hours return policy, which means you have 2
              hours after receiving your item to request a return. Once the
              return product is received it will be inspected and the return
              will be approved within 2-4 hours
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-orange-600">Refunds </h2>
            <p className="mt-4 text-lg">
              We will notify you once we’ve received and inspected your return,
              and let you know if the refund was approved or not. If approved,
              you’ll be automatically refunded on your original payment method
              within 10 business days. Please remember it can take some time for
              your bank or credit card company to process and post the refund
              too. If more than 15 business days have passed since we’ve
              approved your return, please contact us at{" "}
              <b>howdn68@gmail.com / +91-9235264749</b>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RefundAndReturnPolicy;
