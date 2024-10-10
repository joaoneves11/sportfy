import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-require-imports": "off", // Certifique-se de estar importando o plugin corretamente
    },
  },
  // Adicionando as configurações recomendadas
  pluginJs.configs.recommended,
  tseslint.configs.recommended, // Corrigi a forma como o @typescript-eslint é importado
  pluginReact.configs.flat.recommended,
];
