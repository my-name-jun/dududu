/**
 * Created by brave on 17/3/28.
 */

var env = NODE_ENV;
var envHost = ENV_HOST;
// var source = 'akg';
var source = 'akg';
var serverUrl = '/gis_server';
var lifeTimeInsurancePeriod = 100;//终生保险起期间
var object = {
    order_type: 502,//默认个别产品代号
    source: source,
    companyName: '安康万家团体重大疾病保险',
    pay_year_flag: 'Y',
    lifeTimeInsurancePeriod: lifeTimeInsurancePeriod,
    companyShortName: '安康万家团体重大疾病保险',
    envHost: envHost,
    env: env,
    serverUrl: serverUrl,
    host: '',//项目主机
    loginCodeUrl: serverUrl + '/' + env + '/getAuthImage',//上传文件的主机ip及相对路径
    payUrl: 'http://esales-old.test-cignacmb.com/payment-uat1/index.xhtml',//上传文件的主机ip及相对路径
    appName: serverUrl + '/' + env + '/op/' + source,//项目接口appName
    payAppName: serverUrl + '/' + env,//用于支付成功回调页获取列表appName
    uploadFileAppName: serverUrl + '/' + env + '/file/' + source,//项目接口appName
    notifyConfirmUrl: serverUrl + '/' + env + '/notifyConfirm?source=' + source,//项目下载投保确认书路径
    downLoadBodyCheckUrl: serverUrl + '/' + env + '/downLoadBodyCheck?source=' + source,//项目下载投保确认书路径
    downloadConfirmUrl: serverUrl + '/' + env + '/downloadConfirm?source=' + source,//项目下载投保确认书路径
    previewDownloadFileUrl: serverUrl + '/' + env + '/downLoadBodyCheck?source=' + source,//项目下载投保确认书路径
    notLoginRedirectUrl: serverUrl + '/' + env + '/opr/' + source + '/userIdentification',//项目下载投保确认书路径
    token: 'kohler-mKeyTest',
    backendUrl: serverUrl + "/" + env + "/far/",
    backendUrl2: serverUrl + "/" + env
};
if (env == 'uat' || env == 'uat2') {
    object.payUrl = 'http://esales-old.test-cignacmb.com/payment-uat2/index.xhtml'
    object.faceMatchingUrl = 'https://member-uat.test-cignacmb.com/support/validateVideo';//人脸识别url
}
if (env == 'prd') {
    object.notLoginRedirectUrl = serverUrl + '/' + env + '/opr/' + source + '/userIdentification';
    object.faceMatchingUrl = 'https://member.cignacmb.com/support/validateVideo'; //人脸识别url
}
module.exports = object;