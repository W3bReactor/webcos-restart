"use client";
import styles from './BugReport.module.css'
import {Input, PurpleBtn, SectionDesc, SectionTitle} from "@/shared/ui";
import React, {useState} from "react";
import useSWRMutation from "swr/mutation";
import {ApiResult} from "@/shared/model";
import {CreateEmailResponseSuccess} from "resend";
import {MailSend, sendMail} from "@/shared/api";

export const BugReport = () => {
    const [data, setData] = useState({
        contact: '',
        description: '',
        hidden: ''
    })


    const { trigger: send } = useSWRMutation<
        ApiResult<CreateEmailResponseSuccess>,
        Error,
        "send/mail",
        MailSend
    >(
        "send/mail",
        (_, { arg }) => sendMail(arg)
    )

    const onSend = async () => {
        if (data.description.length > 1000) return;
        if (data.description.length < 10) return;
        await send(
            {
                contact: data.contact,
                description: data.description,
                hidden: data.hidden
            }
        )

        setData({description: '', hidden: '', contact: ''});
    }


    return (
        <section className={styles.bug}>
            <SectionTitle className={styles.bugTitle}>Сообщить о баге</SectionTitle>
            <SectionDesc className={styles.bugDesc}>Напишите нам, если нашли какой-то баг</SectionDesc>
            <div className={styles.bugForm}>
                <Input className={styles.bugInput} placeholder={"Ваш контакт"} value={data.contact} setValue={(v) => setData({...data, contact: v})}/>
                {/* TODO: Сделать shared компонентом*/}
                <textarea
                    value={data.description}
                    onChange={(e) => setData({...data, description: e.target.value})}
                    placeholder={'Опишите проблему'}
                    className={styles.bugTextarea}
                />
                <input
                    type="text"
                    style={{ display: "none" }}
                    value={data.hidden || ""}
                    onChange={(e) => setData({...data, hidden: e.target.value})}
                />
                <PurpleBtn onClick={onSend} type={'btn'}>Отправить</PurpleBtn>
            </div>
        </section>
    );
}
