import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      maxLength: 100,
      minLenght: 2,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["monthly", "annual"],
    },
    category: {
      type: String,
      required: [true, "Subscription category is required"],
      enum: [
        "news",
        "sports",
        "entertainment",
        "technology",
        "fashion",
        "education",
      ],
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return value <= new Date();
        },
        message: "Start date must be in the pasts",
      },
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date): boolean {
          return value > (this as any).startDate;
        },
        message: "Renewal date must be greater than start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      annual: 365,
    };

    this.renewalDate = new Date(this.startDate);
    if (this.frequency && renewalPeriods[this.frequency]) {
      this.renewalDate.setDate(
        this.renewalDate.getDate() + renewalPeriods[this.frequency]
      );
    }
  }
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
