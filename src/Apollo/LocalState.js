//각 컴포넌트에는 자신만의 state가 있는데 (local state) apollo client 에서도 state설정이 필요한 것 같다.
// 먼저 state(model) 타입과, 타입을 변경할 수 있는 함수 resolver

export const defaults={
    isLoggedIn : localStorage.getItem("token")!==null ? true:false
}
// localStorage : 이것을 이용하여 apollo Client의 캐시를 유지할 수 있음. 
// localStorage에서 token이라는 이름의 아이템을 가져와서, null이면 로그인이 안된상태,null이 아니면 로그인 상태로 인식한다.

// 서버로부터 받은 데이터를 해석할 resolver
// token과 cache를 인자로 받아서, log in 이면 Apollo의 localStorage에 token이란 이름으로 토큰을 캐싱하고, 캐시에다가 isLoggedIn을 true로 설정한다.
// log out이면 localStorage에 저장한 token데이터도 지우고, 브라우저를 reloading한다.
export const resolvers= {
    Mutation: {
        logUserIn:(_, {token}, {cache}) => {
            localStorage.setItem("token", token);
            cache.writeData({
                data:{
                    isLoggedIn : true
                }
            });

            return null;
        },
        logUserOut:(_, __, {cache}) => {
            localStorage.removeItem("token");
            window.location.reload();

            return null;
        }
    }
}