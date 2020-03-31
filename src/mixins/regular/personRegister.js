const mixinRegular = {
    data() {
        const userReg = /^[A-Za-z0-9\u4e00-\u9fa5]{6,16}$/;
        const phoneReg = /^1[3456789]\d{9}$/;
        const emallReg = /^[a-zA-Z0-9_\.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        const validateUser = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else if (!userReg.test(value)) {
                callback(new Error("不能输入符号，长度为6到16"));
            } else {
                callback();
            }
        };
        const validatePhone = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入手机号"));
            } else if (!phoneReg.test(value)) {
                callback(new Error("手机号码格式不正确"));
            } else {
                callback();
            }
        };
        const validateEmail = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入邮箱地址"));
            } else if (!emallReg.test(value)) {
                callback(new Error("邮箱格式不正确"));
            } else {
                callback();
            }
        };
        const validateCode = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入验证码"));
            } else {
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            let myReg = /^[0-9a-zA-Z_]{4,32}$/;
            if (!value) {
                callback(new Error("请输入密码"));
            } else if (!myReg.test(value)) {
                callback(new Error("数字字母下划线，长度为4-32位"));
            } else {
                callback();
            }
        };
        let validatePass2 = (rule, value, callback) => {
            let myReg = /^[0-9a-zA-Z_]{4,32}$/;
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (!myReg.test(value)) {
                callback(new Error("数字字母下划线，长度为4-32位"));
            } else if (value !== this.personalForm.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            errorList: {
                userError: "",
                passError: "",
                codeError: "",
                emailError: "",
                phoneError: ""
            },
            rules: {
                userName: [{
                    validator: validateUser,
                    trigger: "blur"
                }],
                password: [{
                    validator: validatePass,
                    trigger: "blur"
                }],
                email: [{
                    validator: validateEmail,
                    trigger: "blur"
                }],
                checkPass: [{
                    validator: validatePass2,
                    trigger: "blur"
                }],
                phone: [{
                    validator: validatePhone,
                    trigger: "blur"
                }],
                code: [{
                    validator: validateCode,
                    trigger: "blur"
                }],
                type: [{
                    type: "array",
                    required: true,
                    message: "请阅读并同意用户守则",
                    trigger: "change"
                }]
            }
        };
    },
    created() {},
    methods: {}
};
export default mixinRegular