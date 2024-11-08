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
            alert(error.responseJSON.message);
        },
    });
}
function updateAddress() {
    let postalCode = $('#postcode').val();
    let detailAddress = $('#detailAddress').val();
    let address =
        $('#roadAddress').val() +
        ' ' +
        $('#extraAddress').val() +
        ' ' +
        $('#detailAddress').val();
    if (!postalCode || !address || !detailAddress) {
        alert('주소를 입력해 주세요.');
    } else {
        $.ajax({
            type: 'PATCH',
            url: '/api/user/updateAddress',
            data: { postalCode: postalCode, address: address },
            success: function (response) {
                alert(response.message);
                window.location.href = '/profile';
            },
            error: function (error) {
                alert(error.responseJSON.message);
                window.location.href = '/';
            },
        });
    }
}
function updateInfo() {
    const name = $('#name').val();
    const phone1 = $('#phone1').val();
    const phone2 = $('#phone2').val();
    const phone3 = $('#phone3').val();
    const phone = phone1 + phone2 + phone3;
    if (name === '' || phone1 === '' || phone2 === '' || phone3 === '') {
        alert('이름과 전화번호를 입력해 주세요.');
    } else {
        $.ajax({
            type: 'PATCH',
            url: '/api/user/updateInfo',
            data: { name: name, phone: phone },
            success: function (response) {
                alert(response.message);
                window.location.href = '/profile';
            },
            error: function (error) {
                alert(error.responseJSON.message);
                window.location.href = '/';
            },
        });
    }
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
                alert(error.responseJSON.message);
                window.location.href = '/';
            },
        });
    }
}
function redirectModifyPage() {
    window.location.href = '/updateInfo';
}
