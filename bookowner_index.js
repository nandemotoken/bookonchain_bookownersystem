const http = require('http');
const fs = require('fs');
const url = require('url');

const index = fs.readFileSync('./01.html' , 'utf8');
const readerjs = fs.readFileSync('./reader.js' , 'utf8');
const writerjs =  fs.readFileSync('./writer.js' , 'utf8');
const abijs = fs.readFileSync('./abi.js' , 'utf8');
const stylejs = fs.readFileSync('./assets/js/-Identity-Page-BS4-.js','utf8');
const link_hider = fs.readFileSync('./assets/js/link_hider.js','utf8');
const bs4 = fs.readFileSync('./assets/css/-Identity-Page-BS4-.css','utf8');
const bookonchainimage = fs.readFileSync('./assets/img/bookonchain_cover_small.png');

var server = http.createServer(book_owner_system);
server.listen(80);
console.log('server start');


function book_owner_system(request , response){
	var url_parts = url.parse(request.url , true );
	switch(url_parts.pathname) {

		//取得ファイルがreader.jsの場合
	case '/reader.js':
		response.writeHead(200,{'Content-Type': 'text/javascript'});
		response.write(readerjs);
		response.end();
	break;

		//取得ファイルがwriter.jsの場合
	case '/writer.js':
		response.writeHead(200,{'Content-Type': 'text/javascript'});
		response.write(writerjs);
		response.end();
	break;

		//取得ページがabi.jsの場合
	case '/abi.js':
		response.writeHead(200,{'Content-Type': 'text/javascript'});
		response.write(abijs);
		response.end();
	break;

		//取得ページがassets/img/bookonchain_cover_small.pngの場合
	case '/assets/img/bookonchain_cover_small.png':
		response.writeHead(200,{'Content-Type': 'image/png'});
		response.write(bookonchainimage);
		response.end();
	break;

		//取得ページがassets/js/-Identity-Page-BS4-.jsの場合
	case '/assets/js/-Identity-Page-BS4-.js':
		response.writeHead(200,{'Content-Type': 'text/javascript'});
		response.write(stylejs);
		response.end();
	break;

		//取得ページがassets/js/link_hider.jsの場合
	case '/assets/js/link_hider.js':
		response.writeHead(200,{'Content-Type': 'text/javascript'});
		response.write(link_hider);
		response.end();
	break;

		//取得ページがassets/css/-Identity-Page-BS4-.cssの場合
	case '/assets/css/-Identity-Page-BS4-.css':
		response.writeHead(200,{'Content-Type': 'text/css'});
		response.write(bs4);
		response.end();
	break;

		//メインページの描画処理
	case '/':
		response.writeHead(200,{'Content-Type': 'text/html'});
		response.write(index);
		response.end();
	break;

		//トランザクション送信用ページの描画処理
	case '/tx_sender':
		response.writeHead(200,{'Content-Type': 'text/html'});
		response.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Bookowner registration</title><script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.36/dist/web3.min.js"></script><script src="./abi.js"></script><script src="./writer.js"></script></head>');
		response.write("<body><h1>Bookowner registration</h1><p>トランザクションを送信します。ウォレットを操作してください。</p><p>Etherumへのデータ登録には1分以上かかる場合があります。</p><p>対応ブラウザ調査 20190916</p> <p>対応ブラウザ：chrome + metamask</p> <p>対応ブラウザ：chrome + niftywallet</p> <p>対応ブラウザ：firefox + metamask</p> <p>対応ブラウザ：iphone + opera touch</p> <p>バグ調査中：android + opera</p><p>トランザクションを送信できない場合：対応ブラウザを用意して頂き、テプラに記載の文字列を改行なく入力してトランザクションを送付してください。お手数おかけいたします。</p></body>");
		//ユーザのブラウザ上のmetamaskからトランザクションを送るためのhtml文
		if ( url_parts.query.bookid != undefined && url_parts.query.code != undefined){ response.write( "<script> regist(" +  url_parts.query.bookid + ","+ url_parts.query.code + ")</script>" );  }
		response.end();
	break;


	default:
		response.writeHead(200,{'Content-Type': 'text/html'});
		response.write("404");
		response.end();
	break;
	}

}




