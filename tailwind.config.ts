import type { Config } from "tailwindcss";

const px0_50 = Object.fromEntries(
  Array.from({ length: 51 }, (_, i) => [i, `${i}px`]),
);
const px0_100 = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => [i, `${i}px`]),
);
const px0_200 = Object.fromEntries(
  Array.from({ length: 201 }, (_, i) => [i, `${i}px`]),
);
const px0_400 = Object.fromEntries(
  Array.from({ length: 401 }, (_, i) => [i, `${i}px`]),
);

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      tablet: { max: "1199px" },
      mobile: { max: "767px" },
    },
    fontFamily: {
      "nanum-square-round": ["NanumSquareRound", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderRadius: px0_50,
      fontSize: px0_100,
      spacing: px0_200,
      width: px0_400,
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        black: "var(--black)",
        "gray-200": "var(--gray-200)",
        "gray-50": "var(--gray-50)",
        "gray-40": "var(--gray-40)",
        "gray-30": "var(--gray-30)",
        "gray-20": "var(--gray-20)",
        "gray-10": "var(--gray-10)",
        white: "var(--white)",
        "red-40": "var(--red-40)",
        "red-30": "var(--red-30)",
        "red-20": "var(--red-20)",
        "red-10": "var(--red-10)",
        "pink-500": "var(--pink-500)",
        "blue-20": "var(--blue-20)",
        "blue-10": "var(--blue-10)",
        "green-20": "var(--green-20)",
        "green-10": "var(--green-10)",
        kakao: "var(--kakao)",
        "text-05": "var(--text-05)",
        "text-04": "var(--text-04)",
        "text-03": "var(--text-03)",
        "text-02": "var(--text-02)",
        "text-01": "var(--text-01)",
        "bg-06": "var(--bg-06)",
        "bg-05": "var(--bg-05)",
        "bg-04": "var(--bg-04)",
        "bg-03": "var(--bg-03)",
        "bg-02": "var(--bg-02)",
        "dim-80": "var(--dim-80)",
        "dim-60": "var(--dim-60)",
        "dim-40": "var(--dim-40)",
        "primary-press": "var(--primary-press)",
        "secondary-press": "var(--secondary-press)",
        "line-05": "var(--line-05)",
        "line-04": "var(--line-04)",
        "line-03": "var(--line-03)",
        "line-02": "var(--line-02)",
        "line-01": "var(--line-01)",
        "system-success": "var(--system-success)",
        "system-information": "var(--system-information)",
        "system-warning": "var(--system-warning)",
        "system-error": "var(--system-error)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
