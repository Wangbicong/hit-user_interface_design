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
                    },
                    stringLength: {
                        min: 8,
                        max: 16,
                        message: '密码长度必须在8到16之间。'
                    }
                }
            },
            name: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空。'
                    },
                    stringLength: {
                        min: 2,
                        max: 20,
                        message: '用户名长度必须在2到20之间。'
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
                    },
                    stringLength: {
                        min: 11,
                        max: 11,
                        message: '手机号长度必须为11。'
                    },
                    numeric: {
                        message: '手机号必须是数字。'
                    }
                }
            },
            skill: {
                validators: {
                    choice: {
                        min: 1,
                        message: '至少选择一个技术方向。'
                    }
                }
            },
            personal_info: {
                validators: {
                    stringLength: {
                        max: 200,
                        message: '个人简介长度不能超过200。'
                    }
                }
            },
            project_info: {
                validators: {
                    stringLength: {
                        max: 200,
                        message: '个人简介长度不能超过200。'
                    }
                }
            }
        }
    });
});