import sinon, {SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic} from "sinon";
import {expect} from "chai";
import {HTTPTransport, Methods} from "./HTTPTransport";

describe("HTTP", () => {
  let xhr: SinonFakeXMLHttpRequestStatic, instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];
  const originalXMLHttpRequest = global.XMLHttpRequest;

  const data = {test: 'test'};

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTPTransport("https://example-endpoint");
  });

  afterEach(() => {
    requests.length = 0;
  });

  after(() => {
    global.XMLHttpRequest = originalXMLHttpRequest;
  });

  it("should send GET request on get()", () => {
    instance.get("test");

    const [request] = requests;

    expect(request.url).to.eq('https://example-endpoint/test');
    expect(request.method).to.eq(Methods.GET);
  });

  it("should send PUT request on put()", () => {
    instance.put("test", {data});

    const [request] = requests;

    expect(request.method).to.eq(Methods.PUT);
    expect(request.url).to.eq('https://example-endpoint/test');
    expect(request.requestBody).to.eq(JSON.stringify(data));
  });

  it("should send POST request on post()", () => {
    instance.post("test", {data});

    const [request] = requests;

    expect(request.method).to.eq("POST");
    expect(request.url).to.eq('https://example-endpoint/test');
    expect(request.requestBody).to.eq(JSON.stringify(data));
  });

  it("should send DELTE request on delete()", () => {
    instance.delete("test", {data});

    const [request] = requests;

    expect(request.method).to.eq("DELETE");
    console.log(request.url);
    expect(request.url).to.eq('https://example-endpoint/test');
    expect(request.requestBody).to.eq(JSON.stringify(data));
  });
});