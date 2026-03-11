import styles from './Social.module.css';
import {DzenIcon, TgWhiteIcon, TiktokWhiteIcon, VkWhiteIcon} from "@/shared/assets";
import {BlackBtn, SectionDesc, SectionTitle} from "@/shared/ui";

type SocialPlatform = 'Телеграм' | 'Тик-ток' | 'Дзен' | 'ВК';

interface ISocial {
    platform: SocialPlatform;
    title: string;
    description: string;
    buttonText?: string;
    href: string;
}

const platformIcons = {
    'Телеграм': TgWhiteIcon,
    'Тик-ток': TiktokWhiteIcon,
    'Дзен': DzenIcon,
    'ВК': VkWhiteIcon,
};

export const Social = ({
                               platform,
                               title,
                               description,
                               buttonText = `Подписаться на ${platform}`,
                               href = '#',
                           }: ISocial) => {
    return (
        <section className={styles.social}>
            <SectionTitle className={styles.socialTitle}>{title}</SectionTitle>
            <SectionDesc className={styles.socialDesc}>{description}</SectionDesc>
            <div className={styles.socialItem}>
                <BlackBtn
                    srcImage={platformIcons[platform].src}
                    type="link"
                    href={href}
                    className={styles.socialBtn}
                >
                    {buttonText}
                </BlackBtn>
            </div>
        </section>
    );
};