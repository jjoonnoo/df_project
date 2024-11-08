function validateCheck() {
    let name = $('#name').val();
    let phone = $('#phone').val();
    let postalCode = $('#postcode').val();
    let detailAddress = $('#detailAddress').val();
    let address = $('#roadAddress').val();
    let checkbox = document.getElementById('usePersonalInfo');
    if (name === '') {
        alert('이름을 입력해 주세요.');
    } else if (phone === '') {
        alert('전화번호를 입력해 주세요.');
    } else if (postalCode === '' || address === '') {
        alert('우편번호 찾기를 완료해 주세요.');
    } else if (detailAddress === '') {
        alert('상세 주소를 입력해주세요.');
    } else if (!checkbox.checked) {
        alert(
            '개인정보 수집 이용에 동의해주세요. 동의 하지 않으면 이용하실 수 없습니다.'
        );
    } else {
        createUser();
    }
}
function daumPostal() {
    new daum.Postcode({
        oncomplete: function (data) {
            let roadAddr = data.roadAddress;
            let extraRoadAddr = '';
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraRoadAddr += data.bname;
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
                extraRoadAddr +=
                    extraRoadAddr !== ''
                        ? ', ' + data.buildingName
                        : data.buildingName;
            }
            if (extraRoadAddr !== '') {
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById('roadAddress').value = roadAddr;
            document.getElementById('jibunAddress').value = data.jibunAddress;
            if (roadAddr !== '') {
                document.getElementById('extraAddress').value = extraRoadAddr;
            } else {
                document.getElementById('extraAddress').value = '';
            }
            let guideTextBox = document.getElementById('guide');
            if (data.autoRoadAddress) {
                let expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML =
                    '(예상 도로명 주소 : ' + expRoadAddr + ')';
                guideTextBox.style.display = 'block';
            } else if (data.autoJibunAddress) {
                var expJibunAddr = data.autoJibunAddress;
                guideTextBox.innerHTML =
                    '(예상 지번 주소 : ' + expJibunAddr + ')';
                guideTextBox.style.display = 'block';
            } else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
        },
    }).open();
}
//유저 생성(회원가입)
function createUser() {
    if (confirm('회원가입하시겠습니까?')) {
        let name = $('#name').val();
        let phone =
            $('#phone1').val() + $('#phone2').val() + $('#phone3').val();
        let postalCode = $('#postcode').val();
        let address =
            $('#roadAddress').val() +
            ' ' +
            $('#extraAddress').val() +
            ' ' +
            $('#detailAddress').val();
        $.ajax({
            type: 'POST',
            url: '/api/user/createUser',
            data: {
                name: name,
                address: address,
                phone: phone,
                postalCode: postalCode,
            },
            success: function (response) {
                alert(response.message);
                window.location.href = '/profile';
            },
            error: function (error) {
                alert(error.message);
            },
        });
    } else {
        alert('회원가입이 취소 되었습니다.');
    }
}
function fnPopup() {
    window.open(
        'https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb',
        'popupChk',
        'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no'
    );
    document.form_chk.action =
        'https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb';
    document.form_chk.target = 'popupChk';
    document.form_chk.submit();
}
