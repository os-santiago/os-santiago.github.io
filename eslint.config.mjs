import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [".github/**", "out/**", ".next/**"],
  },
];

export default eslintConfig;
