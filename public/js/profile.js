//내 정보보기
function getMyProfile() {
    $.ajax({
        type: 'GET',
        url: '/api/user/findUserByYoutubeId',
        data: {},
        success: function (response) {},
        error: function (error) {
            alert(error.message);
        },
    });
}
//회원 정보 수정
function modifyUser() {
    $.ajax({
        type: 'PUT',
        url: '/api/user/modifyUser',
        data: {},
        success: function (response) {
            alert(response.message);
        },
        error: function (error) {
            alert(error.message);
        },
    });
}
//회원 탈퇴
function deleteUser() {
    if (confirm('정말로 탈퇴하시겠습니까?')) {
        $.ajax({
            type: 'DELETE',
            url: '/api/user/deleteUser',
            data: {},
            success: function (response) {
                alert(response.message);
            },
            error: function (error) {
                alert(error.message);
            },
        });
    }
}
//내 주문 내역 보기
// function myProductStatus(){
//     $.ajax({
//         type:'GET',
//         url:'/api/',
//         data:{},
//         success:function(response){

//         },error:function(error){
//             alert(error.message)
//         }
//     })
// }
