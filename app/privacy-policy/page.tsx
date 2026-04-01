import {PrivacyPolicyPage} from "@/pages";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Политика конфиденциальности",
    description: "Политика конфиденциальности",
};


export default function PrivacyPolicy() {
    return (
        <PrivacyPolicyPage/>
    );
}
