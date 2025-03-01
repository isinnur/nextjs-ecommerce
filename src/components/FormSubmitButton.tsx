"use client";

//belirli bir bileşen için props türlerini almak için kullanılır.
import React, { ComponentProps } from "react";
import {useFormStatus } from "react-dom";
//import { useState } from "react";

//children ve className olmak üzere iki özellik ve ComponentProps türüyle birleştirilerek tanımlanır.
type FormSubmitButtonProps = {
    children: React.ReactNode,
    className?: string,
} & ComponentProps<"button"> // "button" bileşeni için alınabilecek props türlerini temsil eder.

//FormSubmitButton adlı bir fonksiyonel bileşen tanımlar
export default function FormSubmitButton(
    //Bu bileşen, children ve className adlı iki parametre alır
    {children,className, ...props} : FormSubmitButtonProps //bunların türünü FormSubmitButtonProps olarak belirtir
){
   const {pending} = useFormStatus();
    return (
        //bileşenin dönüş değeri olarak, children değerini içeren bir düğme öğesi döndürülür.
        <button 
        {...props}
        className={`btn btn-primary ${className}`} 
        type="submit"
        disabled= {pending}
        >
            {pending && <span className="loading load-spinner"/>}
            {children}</button>
    )
}

//FormSubmitButton bileşeni, belirli bir düğmenin tüm varsayılan ve özel props'larını alabilir ve bu props'ları kullanarak düğmeyi oluşturur. 
//Bu şekilde, bu bileşeni farklı form alanlarıyla birlikte kullanarak yeniden kullanılabilir bir düğme bileşeni elde edebiliriz