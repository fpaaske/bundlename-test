import {Component, OnInit} from "@angular/core";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    onTap() {
        const authSession = ASWebAuthenticationSession
            .alloc()
            .initWithURLCallbackURLSchemeCompletionHandler(
                NSURL.URLWithString("https://tek.no"),
                "",
                (url, error) => {
                    console.log(url);
                    console.log(error);
                });

        const Provider = (NSObject as any).extend({
            presentationAnchorForWebAuthenticationSession(session: ASWebAuthenticationSession): UIWindow {
                return UIApplication.sharedApplication.keyWindow;
            }
        }, {
            name: "CustomContextProvider",
            protocols: [ASWebAuthenticationPresentationContextProviding]
        })
        authSession.presentationContextProvider = new Provider();
        authSession.start();
    }
}
