<template>
    <div class="publishtask">
        <div class="Crumbs">
            <div class="container deskHeader">
                <h4>
                    您的位置：
                    <router-link to="issueManage">缺陷跟踪</router-link>
                    >
                    <span class="active">新增缺陷</span>
                </h4>
            </div>
        </div>
        <div class="container deskHeader">
            <el-card class="box-card0">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                    <el-form-item label="标题" prop="title">
                        <el-input class="input_title title" v-model="ruleForm.title"></el-input>
                    </el-form-item>

                    <el-form-item label="描述" prop="description">
                        <quill-editor
                                v-model="ruleForm.description"
                                ref="myQuillEditor"
                                class="editer"
                                :options="editorOption"
                                @blur="onEditorBlur"
                                @focus="onEditorFocus"
                                @ready="onEditorReady"
                        ></quill-editor>

                        <!-- 富文本编辑框 -->
                        <!-- <div id="editor"
              style="float:right;width:95%;height:350px;background: #ffffff;">
              </div> -->
                    </el-form-item>

                    <el-form-item label="上传附件">
                        <sourceUpload :uploadIndex="uploadIndex" v-on:setIdCard="setIdCard($event)"/>
                    </el-form-item>
                    <el-form-item label="指派项目" prop="projectId">
                        <el-select v-model="ruleForm.projectId" clearable placeholder="请选择项目"
                                   @change="getAppointList($event)">
                            <el-option :value="item.projectId" v-for="(item, index) in projectSele" :key="index"
                                       :label="item.projectName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指派人员" prop="appointId">
                        <el-select id="appointuser" v-model="ruleForm.appointId" clearable placeholder="请选择人员" ref="ad">
                            <el-option :value="item.userId" v-for="(item, index) in userSele" :key="index"
                                       :label="item.userName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="缺陷级别" prop="level">
                        <el-select v-model="ruleForm.level" clearable placeholder="请选择缺陷等级">
                            <el-option label="█马上解决" value="1" style="color:red"></el-option>
                            <el-option label="█急需解决" value="2" style="color:orange"></el-option>
                            <el-option label="█高度重视" value="3" style="color:#FFE153"></el-option>
                            <el-option label="█正常处理" value="4" style="color:green"></el-option>
                            <el-option label="█低优先级" value="5" style="color:blue"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="publish">
                        <el-button type="primary" @click="submitForm('ruleForm')" size="medium"
                                   style="width:150px;display:block;margin:0 auto">保存
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    // import Qiniu from 'qiniu-js'
    // import * as Qiniu from 'qiniu-js'
    // import FileUpload from "vue-upload-component";
    // import E from 'wangeditor';
    import {quillEditor} from 'vue-quill-editor'; //调用编辑器
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import {httpGet, httpPost} from '@/utils/http.js';
    import {errTips, successTips} from '@/utils/tips.js';
    import sourceUpload from '@/common/upload/resourceUpload';
    import {mapMutations, mapActions, mapGetters} from 'vuex';
    import regular from '@/mixins/regular/publish.js';

    export default {
        components: {
            quillEditor,
            sourceUpload
        },
        mixins: [regular],
        data() {
            return {
                projectSele: [],
                userSele: [],
                editorOption: {},
                uploadIndex: false,
                ruleForm: {
                    title: '',
                    description: '',
                    level: '',
                    projectId: '',
                    appointId: '',
                    resourceFile: ''
                },
                // 表单验证
                rules: {
                    title: [{required: true, message: '请输入标题', trigger: 'blur'}]
                }
            };
        },
        // mounted() {
        //   // this.getQiniuToken();

        //       var editor = new E('#editor')
        //   // 配置服务器端地址
        //   editor.customConfig.uploadImgServer = 'http://10.250.19.18:8081/cosine-core-web-api//v1/public/bid/upload/image'
        //   // 将图片大小限制为 3M
        //   editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
        //   // 限制一次最多上传 5 张图片
        //   editor.customConfig.uploadImgMaxLength = 5
        //   editor.customConfig.uploadFileName = 'uploadFile';
        //   editor.customConfig.withCredentials = true;
        //   // 隐藏“网络图片”tab
        //   editor.customConfig.showLinkImg = false;
        //   // 允许上传到七牛云存储
        //   editor.customConfig.withCredentials = true
        //   //editor.customConfig.qiniu = true;
        //   editor.customConfig.uploadImgHooks = {
        //     before: function (xhr, editor, files) {
        //       // console.log(xhr)
        //       // console.log(editor)
        //       // console.log(files)
        //     },
        //     error: function (xhr, editor) {
        //       console.log(xhr)
        //       console.log(editor)
        //     },
        //     success: function (xhr, editor, result) {
        //       // 图片上传并返回结果，图片插入成功之后触发
        //       // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        //       console.log('success')
        //       console.log(xhr)
        //       console.log(editor)
        //       console.log(result)
        //     },
        //     fail: function (xhr, editor, result) {
        //         // 图片上传并返回结果，但图片插入错误时触发
        //         // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        //       console.log('fail')
        //       console.log(xhr)
        //       console.log(editor)
        //       console.log(result)
        //     },
        //     customInsert: function (insertImg, result, editor) {
        //       // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        //       // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        //       // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        //       var url =result.data;
        //       alert(url);
        //       insertImg(url);
        //       // result 必须是一个 JSON 格式字符串！！！否则报错
        //     }
        //   }
        //   editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0
        //   editor.create();

        // },
        //   mounted () {
        //    var editor = new E('#editor')
        //     // 允许上传到七牛云存储
        //     editor.customConfig.qiniu = true
        //     editor.create()

        //     // editor.customConfig.uploadImgServer = '/upload'

        //     // 初始化七牛上传
        //     this.uploadInit(editor)

        // // 初始化七牛上传的方法

        //     // // 封装 console.log 函数
        //     // function printLog(title, info) {
        //     //     window.console && console.log(title, info);
        //     // }

        //   },
        created: function () {
            this.getProjectList();
        },

        methods: {
            ...mapMutations(['setCache']),

            uploadInit(editor) {
                // 获取相关 DOM 节点的 ID
                var btnId = editor.imgMenuId;
                var containerId = editor.toolbarElemId;
                var textElemId = editor.textElemId;

                // 创建上传对象
                var uploader = Qiniu.uploader({
                    runtimes: 'html5,flash,html4', //上传模式,依次退化
                    browse_button: btnId, //上传选择的点选按钮，**必需**
                    uptoken_url: '/v1/authorization/coreuser/signature/qiniu',
                    //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                    // uptoken : '<Your upload token>',
                    //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                    // unique_names: true,
                    // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
                    // save_key: true,
                    // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
                    domain: 'http://7xrjl5.com1.z0.glb.clouddn.com/',
                    //bucket 域名，下载资源时用到，**必需**
                    container: containerId, //上传区域DOM ID，默认是browser_button的父元素，
                    max_file_size: '100mb', //最大文件体积限制
                    flash_swf_url: '../js/plupload/Moxie.swf', //引入flash,相对路径
                    filters: {
                        mime_types: [
                            //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
                            {title: '图片文件', extensions: 'jpg,gif,png,bmp'}
                        ]
                    },
                    max_retries: 3, //上传失败最大重试次数
                    dragdrop: true, //开启可拖曳上传
                    drop_element: textElemId, //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                    chunk_size: '4mb', //分块上传时，每片的体积
                    auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    init: {
                        FilesAdded: function (up, files) {
                            plupload.each(files, function (file) {
                                // 文件添加进队列后,处理相关的事情
                                printLog('on FilesAdded');
                            });
                        },
                        BeforeUpload: function (up, file) {
                            // 每个文件上传前,处理相关的事情
                            printLog('on BeforeUpload');
                        },
                        UploadProgress: function (up, file) {
                            // 显示进度
                            printLog('进度 ' + file.percent);
                        },
                        FileUploaded: function (up, file, info) {
                            // 每个文件上传成功后,处理相关的事情
                            // 其中 info 是文件上传成功后，服务端返回的json，形式如
                            // {
                            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                            //    "key": "gogopher.jpg"
                            //  }
                            printLog(info);
                            // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

                            var domain = up.getOption('domain');
                            var res = $.parseJSON(info);
                            var sourceLink = domain + res.key; //获取上传成功后的文件的Url

                            printLog(sourceLink);

                            // 插入图片到editor
                            editor.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>');
                        },
                        Error: function (up, err, errTip) {
                            //上传出错时,处理相关的事情
                            printLog('on Error');
                        },
                        UploadComplete: function () {
                            //队列文件处理完毕后,处理相关的事情
                            printLog('on UploadComplete');
                        }
                        // Key 函数如果有需要自行配置，无特殊需要请注释
                        //,
                        // 'Key': function(up, file) {
                        //     // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                        //     // 该配置必须要在 unique_names: false , save_key: false 时才生效
                        //     var key = "";
                        //     // do something with key here
                        //     return key
                        // }
                    }
                    // domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取
                    // uploader 为一个plupload对象，继承了所有plupload的方法，参考http://plupload.com/docs
                });
            },
            setIdCardPic(data) {
                // alert(this.ruleForm.resourceFile);
                data && (this.ruleForm.resourceFile = data);
                this.ruleForm.resourceFile = '';
                alert(this.ruleForm.resourceFile);
            },
            uploadpicture() {
                alert(this.ruleForm.resourceFile);
                this.ruleForm.resourceFile ? this.setIdCardPic() : (this.uploadIndex = !this.uploadIndex);
            },
            // 封装 console.log 函数
            printLog(title, info) {
                window.console && console.log(title, info);
            },
            handleRemove(file, fileList) {
                this.uploadPicUrl = '';
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 张图片，如需更换，请删除上一张图片在重新选择！`);
            },
            beforeAvatarUpload(file) {
                const isPNG = file.type === 'image/png';
                const isJPEG = file.type === 'image/jpeg';
                const isJPG = file.type === 'image/jpg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isPNG && !isJPEG && !isJPG) {
                    this.$message.error('上传头像图片只能是 jpg、png、jpeg 格式!');
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                    return false;
                }
                this.QiniuData.key = `upload_pic_${file.name}`;
            },
            uploadSuccess(response, file, fileList) {
                console.log(fileList);
                this.uploadPicUrl = `${this.qiniuaddr}/${response.key}`;
            },
            uploadError(err, file, fileList) {
                this.$message({
                    message: '上传出错，请重试！',
                    type: 'error',
                    center: true
                });
            },
            beforeRemove(file, fileList) {
                // return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //提交数据到后台
            handleSubmit() {
                let ajaxData = {
                    receipt_img: this.uploadPicUrl //图片地址
                };
                this.$http
                    .put('/xxx', ajaxData)
                    .then(response => {
                        let {code, data} = response.data;
                        if (code == '0') {
                            this.$message({
                                message: '提交成功！',
                                type: 'success',
                                center: true
                            });
                        }
                    })
                    .catch(error => {
                        this.$message({
                            message: error.msg,
                            type: 'error',
                            center: true
                        });
                    });
            },
            //请求后台拿七牛云token
            getQiniuToken() {
                httpGet('/v1/authorization/coreuser/signature/qiniu').then(results => {
                    const {httpCode, msg} = results.data;
                    if (httpCode === 200) {
                        this.QiniuData.token = results.data.data.secret;
                    } else if (httpCode !== 401) {
                        errTips(msg);
                    }
                });
            },

            getProjectList() {
                httpGet('/v1/authorization/bug/add/probleminfo').then(results => {
                    const {msg, data, httpCode} = results.data;
                    if (httpCode === 200) {
                        this.projectSele = data.projectList;
                    } else if (httpCode === 400) {
                        this.setCache('issueManage');
                    } else if (httpCode !== 401) {
                        errTips(msg);
                    }
                });
            },
            getAppointList(val) {
                if (val != null && val != '' && val != undefined) {
                    this.ruleForm.appointId = '';
                    httpGet('/v1/authorization/bug/add/appoint', {
                        projectId: this.ruleForm.projectId
                    }).then(results => {
                        const {msg, data, httpCode} = results.data;
                        if (httpCode === 200) {
                            this.userSele = data.userList;
                        } else if (httpCode === 400) {
                            this.setCache('issueManage');
                        } else if (httpCode !== 401) {
                            errTips(msg);
                        }
                    });
                }
            },
            onEditorBlur() {
                console.log('blur', this.messages);
            },

            onEditorFocus() {
                console.log('focus', this.messages);
            },

            onEditorReady() {
                console.log('ready', this.messages);
            },

            //提交表单
            setIdCard(data) {
                data && (this.ruleForm.resourceFile = data);
                httpPost('/v1/authorization/bug/add/bugproblem', this.ruleForm).then(results => {
                    const {msg, httpCode} = results.data;
                    if (httpCode === 200) {
                        // alert(this.ruleForm.resourceFile);
                        successTips('新增缺陷成功！');
                        this.setCache('issueManage');
                    } else if (httpCode === 500) {
                        errTips('图片请使用上传资源！');
                    } else if (httpCode !== 401) {
                        errTips(msg);
                    }
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.ruleForm.resourceFile ? this.setIdCard() : (this.uploadIndex = !this.uploadIndex);
                    } else {
                        return false;
                    }
                });
            }
        }
    };
</script>
<style lang="scss">
    @import '@/assets/scss/publishtask.scss';

    .quill-editor {
        width: 100%;
        float: right;
        height: 200px;
        margin: 0px 0px 50px 0px;
    }
</style>
