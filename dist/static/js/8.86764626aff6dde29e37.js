webpackJsonp([8],{"gf/L":function(e,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=a("Dd8w"),i=a.n(r),t=a("NYxO"),o=a("+cKO"),d=a("TYx6"),n=a("i53X"),l=a("a2KH"),c=a("/QaM"),u=a("IcnI"),m={name:"ShiftPasssword",components:{PasswordField:d.a,PasswordRepeatField:n.a,NumberField:l.a,EmailField:c.a},data:function(){return{email:"",password:"",passwordTwo:"",code:3675,number:""}},computed:i()({},Object(t.c)(["getCode"])),methods:{submitHandler:function(){this.$v.$invalid&&this.$v.$touch()}},mounted:function(){this.code=this.getCode},validations:{email:{required:o.required,email:o.email},password:{required:o.required,minLength:Object(o.minLength)(8)},passwordTwo:{required:o.required,sameAsPassword:Object(o.sameAs)("password")},number:{required:o.required,numeric:o.numeric,isCode:function(e){return+e===u.a.state.code}}}},w={render:function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"shift-password"},[a("form",{staticClass:"shift-password__form",on:{submit:function(s){return s.preventDefault(),e.submitHandler(s)}}},[a("div",{staticClass:"form__block"},[a("h4",{staticClass:"form__subtitle"},[e._v("Смена пароля")]),a("email-field",{class:{checked:e.$v.email.required&&e.$v.email.email},attrs:{id:"shift-email",v:e.$v.email},model:{value:e.email,callback:function(s){e.email=s},expression:"email"}}),a("password-field",{class:{checked:e.$v.password.required&&e.$v.passwordTwo.sameAsPassword},attrs:{id:"shift-password",v:e.$v.password,info:"info",registration:"registration"},model:{value:e.password,callback:function(s){e.password=s},expression:"password"}}),a("password-repeat-field",{class:{checked:e.$v.password.required&&e.$v.passwordTwo.sameAsPassword},attrs:{id:"shift-repeat-password",v:e.$v.passwordTwo},model:{value:e.passwordTwo,callback:function(s){e.passwordTwo=s},expression:"passwordTwo"}})],1),a("div",{staticClass:"form__block"},[a("h4",{staticClass:"form__subtitle"},[e._v("Введите код")]),a("span",{staticClass:"form__code"},[e._v(e._s(e.code))]),a("number-field",{class:{checked:e.$v.number.required&&e.$v.number.isCode},attrs:{id:"shift-number",v:e.$v.number},model:{value:e.number,callback:function(s){e.number=s},expression:"number"}})],1),a("div",{staticClass:"shift-password__action"},[a("button-hover",{attrs:{tag:"button",type:"submit",variant:"white"}},[e._v("Сменить")])],1)])])},staticRenderFns:[]};var p=a("VU/8")(m,w,!1,function(e){a("kUQ4")},null,null);s.default=p.exports},kUQ4:function(e,s){}});
//# sourceMappingURL=8.86764626aff6dde29e37.js.map