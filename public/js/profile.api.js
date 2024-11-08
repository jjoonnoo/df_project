//내 정보보기
function getMyInfo() {
    $.ajax({
        type: 'GET',
        url: '/api/user/findUserByYoutubeId',
        data: {},
        success: function (response) {
            const data = response.userInfo;
            const email = data.email;
            const phone = data.phone;
            const name = data.name;
            const nickname = data.nickname;
            const address = data.address;
            const postalCode = data.postalCode;
            const temp = `    <h2>프로필</h2>
            <div class="profile-item">
                <label>이메일</label>
                <span>${email}</span>
            </div>
            <div class="profile-item">
                <label>전화번호</label>
                <span>${phone}</span>
            </div>
            <div class="profile-item">
                <label>이름</label>
                <span>${name}</span>
            </div>
            <div class="profile-item">
                <label>유튜브닉네임</label>
                <span>${nickname}</span>
            </div>
            <div class="profile-item">
                <label>주소</label>
                <span>${address}</span>
            </div>
            <div class="profile-item">
                <label>우편번호</label>
                <span>${postalCode}</span>
            </div>`;
            $('#profile-container').append(temp);
        },
        error: function (error) {
            alert(error.message);
        },
    });
}
function updateAddress() {
    let postalCode = $('#postcode').val();
    let address =
        $('#roadAddress').val() +
        ' ' +
        $('#extraAddress').val() +
        ' ' +
        $('#detailAddress').val();
    $.ajax({
        type: 'PUT',
        url: '/api/user/updateAddress',
        data: { postalCode: postalCode, address: address },
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
                window.location.href = '/';
            },
            error: function (error) {
                alert(error.message);
            },
        });
    }
}
function redirectModifyPage() {
    window.location.href = '/updateInfo';
}
