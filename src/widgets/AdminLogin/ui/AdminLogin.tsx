'use client'
import React, {useState} from "react";
import styles from './AdminLogin.module.css'
import {Input, PurpleBtn} from "@/shared/ui";
import {login} from "@/widgets/AdminLogin";
import { redirect } from 'next/navigation'

export const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitData = async () => {
        const response = await login(email, password);

        if(response.success) {
            redirect('/admin/main')
        }
    }

    return (
        <section className={styles.loginWrapper}>
            <h1 className={styles.loginTitle}>Вы хотите зайти в админ-панель</h1>
            <p className={styles.loginDesc}>Для этого нужно авторизоваться</p>
            <form className={styles.loginForm}>
                <label className={styles.loginLabel} htmlFor="login">
                    <Input type={'text'} id={'login'} name={'login'} value={email} placeholder={'Ваш логин'} setValue={setEmail}/>
                </label>
                <label className={styles.loginLabel} htmlFor="login">
                    <Input type={'password'} id={'login'} name={'login'} value={password} placeholder={'Ваш логин'} setValue={setPassword}/>
                </label>

                <PurpleBtn onClick={submitData} type={'btn'} btnType={'button'}>Авторизоваться</PurpleBtn>
            </form>
        </section>

    );
}
