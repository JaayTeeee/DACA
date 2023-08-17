"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var chakra_1 = require("../../public/styles/chakra");
var axios = require('axios');
var InputForm = function () {
    var _a = (0, react_1.useState)({
        username: '',
        gender: '',
        age: 0,
    }), userData = _a[0], setUserData = _a[1];
    var _b = (0, react_1.useState)(false), showGender = _b[0], setShowGender = _b[1];
    var _c = (0, react_1.useState)(false), showAge = _c[0], setShowAge = _c[1];
    var _d = (0, react_1.useState)(""), redirectTo = _d[0], setRedirectTo = _d[1];
    var _e = (0, react_1.useState)(false), isLoading = _e[0], setLoading = _e[1];
    var setUsername = function (event) {
        var newName = event.target.value;
        setUserData(function (prevUserData) { return (__assign(__assign({}, prevUserData), { username: newName })); });
    };
    var setGender = function (event) {
        var newGender = event.target.value;
        setUserData(function (prevUserData) { return (__assign(__assign({}, prevUserData), { gender: newGender })); });
    };
    var setAge = function (event) {
        var newAge = parseInt(event.target.value);
        setUserData(function (prevUserData) { return (__assign(__assign({}, prevUserData), { age: newAge })); });
    };
    var handleFormSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var newUserdata, request, res, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    if (!!showGender) return [3 /*break*/, 1];
                    setShowGender(true);
                    return [3 /*break*/, 7];
                case 1:
                    if (!(userData.age === 0)) return [3 /*break*/, 2];
                    setShowAge(true);
                    return [3 /*break*/, 7];
                case 2:
                    setLoading(true);
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 6, , 7]);
                    newUserdata = {
                        username: userData.username,
                        gender: userData.gender,
                        age: userData.age,
                    };
                    request = new Request('http://localhost:3001/api/insert', {
                        method: 'POST',
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        }),
                        mode: 'cors',
                        body: JSON.stringify(newUserdata)
                    });
                    return [4 /*yield*/, fetch(request)];
                case 4:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error("Failed to fetch: ".concat(res.statusText));
                    }
                    return [4 /*yield*/, res.json()];
                case 5:
                    response = _a.sent();
                    if (response.success) {
                        setLoading(false);
                        setRedirectTo("/welcome");
                    }
                    else {
                        console.error('Failed to save data');
                    }
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('Failed to save data:', error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    if (redirectTo) {
        (0, navigation_1.redirect)('/welcome');
    }
    return (<>
      {!showAge && !showGender ? (<>
          <div className="delay-100">
            <chakra_1.Text className="daca-font text-shadow max-w-[700px]" fontSize="48px">
              Welcome, how should we address you?
            </chakra_1.Text>
            <form onSubmit={handleFormSubmit} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#EAEAEA",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                padding: "0.5rem",
                borderRadius: "5px",
                marginTop: "20px",
            }}>
              <div className="flex flex-row justify-center">
                <input type="text" style={{
                width: "550px",
                height: "42px",
                backgroundColor: "inherit",
                outlineColor: "#EAEAEA",
                opacity: 0.5,
                textIndent: "10px",
                marginTop: "10px",
                marginBottom: "10px",
            }} value={userData.username} onChange={setUsername} placeholder="Your Name" required/>

                <button type="submit" className="mt-2" style={{
                width: "100px",
                height: "44px",
                borderRadius: "2px",
                backgroundColor: "#2B4BC2",
                cursor: "pointer",
                marginLeft: "10px",
            }}>
                  <chakra_1.Text className="daca-font" fontSize="lg" color="white">
                    OK
                  </chakra_1.Text>
                </button>
              </div>
            </form>
            <chakra_1.Text className="daca-font mt-1" color="grey" align="left">
              Or press Enter to continue...
            </chakra_1.Text>
          </div>
        </>) : !showAge ? (<div className="delay-100">
          <chakra_1.Text className="daca-font text-shadow max-w-[700px]" fontSize="48px">
            What is your gender?
          </chakra_1.Text>
          <form onSubmit={handleFormSubmit} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#EAEAEA",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                padding: "0.5rem",
                borderRadius: "5px",
                marginTop: "20px",
                marginBottom: "60px",
            }}>
            <div className="flex flex-row justify-center">
              <select style={{
                width: "474px",
                height: "42px",
                backgroundColor: "inherit",
                outlineColor: "#EAEAEA",
                opacity: 0.5,
                textIndent: "10px",
                marginTop: "10px",
            }} value={userData.gender} onChange={setGender} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-Binary</option>
                <option value="prefer-not-to-disclose">
                  Prefer Not to Disclose
                </option>
              </select>
              <button type="submit" className="mt-2" style={{
                width: "100px",
                height: "44px",
                borderRadius: "2px",
                backgroundColor: "#2B4BC2",
                cursor: "pointer",
                marginLeft: "10px",
            }}>
                <chakra_1.Text className="daca-font" fontSize="lg" color="white">
                  OK
                </chakra_1.Text>
              </button>
            </div>
          </form>
        </div>) : (<div className="delay-100">
          <chakra_1.Text className="daca-font text-shadow max-w-[700px]" fontSize="48px">
            How old are you?
          </chakra_1.Text>

          <form onSubmit={handleFormSubmit} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#EAEAEA",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                padding: "0.5rem",
                borderRadius: "5px",
                marginTop: "20px",
                marginBottom: "60px",
            }}>
            <div className="flex flex-row justify-center">
              <input type="number" style={{
                width: "474px",
                height: "42px",
                backgroundColor: "inherit",
                outlineColor: "#EAEAEA",
                opacity: 0.5,
                textIndent: "10px",
                marginTop: "10px",
            }} value={userData.age} onChange={setAge} placeholder="Your Age" min={1} required/>
              <button type="submit" className="mt-2" style={{
                width: "100px",
                height: "44px",
                borderRadius: "2px",
                backgroundColor: "#2B4BC2",
                cursor: "pointer",
                marginLeft: "10px",
            }}>
                <chakra_1.Text className="daca-font" fontSize="lg" color="white">
                  OK
                </chakra_1.Text>
              </button>
            </div>
          </form>
        </div>)}
    </>);
};
exports.default = InputForm;
