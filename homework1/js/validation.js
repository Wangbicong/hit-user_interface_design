/**
 * Created by wangbicong on 2017/4/1.
 */

$(function () {
    $('#html5Form').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            email: {
                message: '邮箱验证失败。',
                validators: {
                    notEmpty: {
                        message: '邮箱地址不能为空。'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空。'
                    }
                }
            },
            name: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空。'
                    }
                }
            },
            birthday: {
                validators: {
                    notEmpty: {
                        message: '出生日期不能为空。'
                    }
                }
            },
            phone_number: {
                validators: {
                    notEmpty: {
                        message: '手机号不能为空。'
                    }
                }
            },
            personal_info: {
                validators: {
                    notEmpty: {
                        message: '个人简介不能为空。'
                    }
                }
            },
            project_info: {
                validators: {
                    notEmpty: {
                        message: '项目简介不能为空。'
                    }
                }
            }
        }
    });
});