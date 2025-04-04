export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+.tsx?$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.app.json",
                diagnostics: { ignoreCodes: ["TS151001"] }
            }
        ]
    },
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ['<rootDir>/src/configs/jest.setup.ts']
}
