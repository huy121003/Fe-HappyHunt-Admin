const en = {
  language: 'EN',
  common: {
    success: 'Success',
    error: 'Error',
    fail: 'Fail',
    systemError: 'An error occurred, please try again later',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    confirm: 'Confirm',
    close: 'Close',
    search: 'Search',
    create: 'Create',
    update: 'Update',
    deleteConfirm: 'Are you sure you want to delete?',
    deleteSuccess: 'Delete successful',
    deleteFail: 'Delete failed',
    deleteCancel: 'Cancel deletion',
    deleteCancelSuccess: 'Cancel deletion successful',
    deleteCancelFail: 'Cancel deletion failed',
    add: 'Add',
    view: 'View',
    detail: 'Detail',
    back: 'Back',
    action: 'Action',
    noData: 'No data',
    noDataSearch: 'No data found',
    noDataFilter: 'No data after filtering',
    noDataRole: 'No access rights',
    notFound: 'Page not found',
  },
  menuAdmin: {
    dashboard: 'Dashboard',
    account: 'User Management',
    roles: 'Role Management',
    permissions: 'Permission Management',
    categories: 'Category Management',
    post: 'Post Management',
    reports: 'Report Management',
    exampleMessage: 'Sample Message',
    policies: 'System Policies',
    feedback: 'Feedback & Suggestions',
    postLimits: 'Post Limit',
    postExpiry: 'Post Expiry Time',
    postImages: 'Post Image Limit',
    currencyExchange: 'Currency to Coin Exchange',
    vipPurchase: 'VIP Purchase with Coin',
  },
  loginPage: {
    login: 'Login',
    phoneNumber: 'Phone Number',
    password: 'Password',
    loginButton: 'Login',
    forgotPassword: 'Forgot Password',
    noAccount: 'Don’t have an account?',
    signUp: 'Sign Up',
    phoneRequired: 'Please enter phone number',
    phoneInvalid: 'Invalid phone number',
    passwordRequired: 'Please enter password',
  },
  sendOtp: {
    OTPSend: 'OTP has been sent to phone number ',
    resend: 'Resend',
    resendAfter: 'Resend after',
    enterOTP: 'Enter OTP',
    verify: 'Verify',
    otpVerify: 'Please enter the OTP sent to your phone number',
    back: 'Back',
  },
  registerPage: {
    register: 'Register',
    phoneNumber: 'Phone Number',
    password: 'Password',
    rePassword: 'Re-enter Password',
    loginButton: 'Login',
    hasAccount: 'Already have an account?',
    phoneRequired: 'Please enter phone number',
    phoneInvalid: 'Invalid phone number',
    passwordRequired: 'Please enter password',
    rePasswordRequired: 'Please re-enter password',
    passwordNotMatch: 'Passwords do not match',
    validatePassword:
      'Password must contain at least 8 characters, including uppercase letters, lowercase letters, and numbers',
  },
  forgotPassword: {
    pleaseEnter: 'Please enter your phone number to recover your password',
    forgotPassword: 'Forgot Password',
    phoneNumber: 'Phone Number',
    phoneRequired: 'Please enter phone number',
    phoneInvalid: 'Invalid phone number',
    sendOTP: 'Send OTP',
    back: 'Back to login page',
  },
  categoryManagement: {
    categoryTitle: 'Category Management',
    categoryCreate: 'Create Category',
    categoryUpdate: 'Update Category',
    nameVn: 'Vietnamese Name',
    nameEn: 'English Name',
    description: 'Description',
    url: 'URL',
    icon: 'Icon',
    attributeNameVn: 'Vietnamese Attribute Name',
    attributeNameEn: 'English Attribute Name',
    attributeValue: 'Attribute Value',
    attributeUnit: 'Unit',
    nameVnPlaceholder: 'Enter Vietnamese name',
    nameEnPlaceholder: 'Enter English name',
    descriptionPlaceholder: 'Enter description',
    urlPlaceholder: 'Enter URL',
    iconPlaceholder: 'Select Image',
    attributeNameVnPlaceholder: 'Enter Vietnamese attribute name',
    attributeNameEnPlaceholder: 'Enter English attribute name',
    attributeValuePlaceholder: 'Enter attribute value',
    attributeUnitPlaceholder: 'Enter unit',
    nameVnRequired: 'Please enter Vietnamese name',
    nameEnRequired: 'Please enter English name',
    descriptionRequired: 'Please enter description',
    urlRequired: 'Please enter URL',
    iconRequired: 'Please select image',
    attributeNameVnRequired: 'Please enter Vietnamese attribute name',
    attributeNameEnRequired: 'Please enter English attribute name',
    attributeValueRequired: 'Please enter attribute value',
    attributeUnitRequired: 'Please enter unit',
    chooseIcon: 'Choose Image',
    addAttribute: 'Add Attribute',
    createSuccess: 'Category created successfully',
    updateSuccess: 'Category updated successfully',
  },
};
export default en;
