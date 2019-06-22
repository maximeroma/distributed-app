import React from "react"
import {AuthProvider} from "hooks/auth"

export default ({children}) => <AuthProvider>{children}</AuthProvider>
