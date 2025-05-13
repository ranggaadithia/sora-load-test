import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

const emails = new SharedArray('emails', () => [
  "konopelski.salvador@example.net", "okon.jairo@example.net", "mikel54@example.org",
  "pprohaska@example.net", "zieme.jordane@example.net", "rita62@example.com",
  "elliott86@example.org", "josefina14@example.com", "strosin.alvis@example.org", "enicolas@example.com"
]);

const ticker_ids = new SharedArray('tickers', () => [
  "ABR", "ABLLW", "ACGL", "ACDC", "ACIU", "ACLX", "ACEL", "AACG", "AACB", "ABCS", "ABLG", "AAPX",
  "ACES", "AAA", "ABLD", "ABEO", "AACBU", "ACHR", "ACIO", "ABOT", "ACAD", "AAPR", "AAMI", "ACET",
  "ABAT", "ABLS", "AARD", "ACNT", "ACON", "ABOS", "AAT", "ACM", "ABVC", "AAPY", "ABG", "AACT",
  "ABSI", "ACCO", "ABM", "ACIC", "ABBV", "AAPL", "AA", "ACB", "AAP", "AACBR", "ABVX", "AAPW", "AB",
  "ACNB", "AAON", "ABTS", "ABIG", "AAME", "ABEQ", "ABP", "AAAU", "ACA", "ABVEW", "AC", "ABT", "AAPU",
  "ACN", "ABUS", "AAXJ", "AAM", "ACGLO", "AAVM", "ABLLL", "ACIW", "AAL", "ABNB", "ACLC", "ACHC",
  "AADR", "ACMR", "ABHY", "ABLV", "ABEV", "ABCL", "ACGLN", "ACLS", "AAPG", "ACONW", "ACOG", "ACI",
  "ABPWW", "ACLO", "AAPD", "ABCB", "ABNY", "ACGR", "ABL", "ACHV", "ACCS", "ABVE", "A", "AAPB",
  "ABFL", "AAOI"
]);

export let options = {
  stages: [
    { duration: '2m', target: 25 },
    { duration: '2m', target: 25 },
    { duration: '2m', target: 50 },
    { duration: '2m', target: 50 },
    { duration: '2m', target: 25 },
    { duration: '2m', target: 50 },
    { duration: '2m', target: 25 },
    { duration: '2m', target: 50 },
    { duration: '2m', target: 25 },
    { duration: '2m', target: 25 }
  ]
};

export default function () {
  const email = emails[Math.floor(Math.random() * emails.length)];
  const ticker = ticker_ids[Math.floor(Math.random() * ticker_ids.length)];

  const url = `http://127.0.0.1:38685/api/stock/${ticker}`;
  const payload = JSON.stringify({
    email: email,
    password: 'password'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const res = http.post(url, payload, params);
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
