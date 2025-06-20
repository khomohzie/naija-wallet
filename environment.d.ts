declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "production" | "development" | "test";
    MONGO_URI: string;
    PICA_API_KEY: string;
    PICA_API_URL: string;
    PICA_API_URL: string;
    NEXT_PUBLIC_APPNAME: string;
    NEXT_PUBLIC_LINKEDIN: string;
    NEXT_PUBLIC_TWITTER: string;
    NEXT_PUBLIC_FACEBOOK: string;
    NEXT_PUBLIC_INSTAGRAM: string;
    NEXT_PUBLIC_TWITTER_USERNAME: string;
    NEXT_PUBLIC_OFFICE_ADDRESS: string;
    NEXT_PUBLIC_EMAIL: string;
    NEXT_PUBLIC_FORMATTEDTELEPHONE: string;
    NEXT_PUBLIC_TELEPHONE: string;
    NEXT_PUBLIC_LOCATE_OFFICE: string;
    NEXT_PUBLIC_WEBSITE_URL: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_TERMS_OF_SERVICE: string;
    NEXT_PUBLIC_PRIVACY_POLICY: string;
    NEXT_PUBLIC_COOKIE_POLICY: string;
    NEXT_PUBLIC_SECURITY: string;
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: string;
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: string;
  }
}
