# Các công nghệ mới trong phát triển phần mềm

## Đề tài

Tạo một trò chơi khuyến mãi dựa vào cơ chế phát sinh ngẫu nhiên một cách minh bạch, công khai bằng Smart Contract

## Danh sách thành viên - Nhóm 1

18120622 - Lê Văn Trung

19120465 - Trần Vũ Việt Cường

19120490 - Phạm Hải Dương

## Nghiệp vụ chính

- Người chơi mua số may mắn với giá định sẵn
- Quản trò tiến hành random chọn số
- Trả thưởng cho người chơi trúng số

## Công nghệ sử dụng

- Ganache
- Truffle
- Smart contracts Solidity (Ethereum)
- Web3
- Metamask
- React

## Tiên quyết

Đảm bảo cài đặt đủ các thành phần sau trước khi chạy:

- [Ganache](https://trufflesuite.com/ganache/)
- [Truffle](https://www.npmjs.com/package/truffle)
- [Extension ví Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) trên trình duyệt

## Cách chạy

1. Contract solidity

Mở Ganache và tạo mới một workspace
Ở Truffle Project chọn đến file truffle-config.js của project này

Mở terminal ở thư mục gốc của project, chạy lệnh sau để migrate blockchain

```sh
truffle migrate
```

2. Frontend react

Từ thư mục gốc của project, đi vào project front-end

```sh
cd client
```

Cài đặt các thư viện cần thiết

```sh
npm install
```

Thực thi lệnh sau để khởi động front-end

```sh
npm start
```

Cấu hình Metamask network:

- RPC: http://127.0.0.1:7545
- ChainID: 1337

Vào Ganache copy private key paste vào trong ví Metamask
