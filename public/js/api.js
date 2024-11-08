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
//내 정보보기
function myInfo() {
    $.ajax({
        type: 'GET',
        url: '/api/user/findUserByGoogleId',
        data: {},
        success: function (response) {},
        error: function (error) {
            alert(error.message);
        },
    });
}
//내 주문 내역 보기
function myProductStatus() {
    $.ajax({
        type: 'GET',
        url: '/api/',
        data: {},
        success: function (response) {},
        error: function (error) {
            alert(error.message);
        },
    });
}
//관리자 전체 주문 보기(배송 전 배송 완료)
function adminOrder() {
    $.ajax({
        type: 'GET',
        url: '/api/admin',
        data: {},
        success: function (response) {},
        error: function (error) {
            alert(error.message);
        },
    });
}
//관리자 배송 전 배송 완료 정렬
function adminDelivery() {}
//배송 취소 및 변경
function deliveryStatusChange() {}
//상품 리스트(재고, 이름 등)
function productList() {}
//상품 추가
function productAdd() {}
//상품 삭제
function productSub() {}
//상품 수정
function productModify() {}
