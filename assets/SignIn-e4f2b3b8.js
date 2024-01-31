import{z as u,B as n,r as m,b as p,a as h,Q as x,S as g,a6 as j,j as e,L as S,X as y,W as w,$ as b,a0 as k,a1 as v,a7 as E,O as f,a8 as B,a9 as F,a3 as I,a4 as L}from"./index-bb739d8f.js";import{u as R}from"./useAuthResetError-ad584494.js";const q=()=>u({email:n().email("Invalid email address").required("Required field"),password:n().min(8).required("Required field")}),A=()=>{const[i,s]=m.useState(!1),l=p(),o=h(x),c=[{name:"email",placeholder:"E-mail",type:"text"},{name:"password",placeholder:"Password",type:"password"}],{resetAuthError:t}=R(),r=g({initialValues:{email:"",password:""},validationSchema:q(),onSubmit:async a=>{try{s(!0),await l(j(a)),s(!1)}catch(d){console.error("Registration failed:",d.message)}}});return e.jsxs("div",{className:"container",children:[i&&e.jsx(S,{}),o&&o.type==="login"&&e.jsx(y,{children:"The email or password you entered is incorrect. Please review your information and attempt to log in again."}),e.jsx(w,{children:e.jsxs(b,{children:[e.jsx(k,{children:"Sign in"}),e.jsx(v,{children:"You need to login to use the service"}),e.jsxs(E,{onSubmit:r.handleSubmit,children:[c.map(a=>e.jsx(f,{formik:r,id:a.name.toLowerCase(),type:a.type,placeholder:a.placeholder,label:a.label,onBlur:()=>r.handleBlur({target:{name:a.name}}),showError:!0},a.name)),e.jsx(B,{type:"submit",children:"Sign in"}),e.jsx(F,{to:"/forgot-password",onClick:t,children:"Forgot your password?"})]}),e.jsxs(I,{children:[e.jsx("p",{children:"If you don't have an account yet"}),e.jsx(L,{to:"/signup",onClick:t,children:"Sign up"})]})]})})]})},P=()=>e.jsx("div",{children:e.jsx(A,{})});export{P as default};