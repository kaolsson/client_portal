class VendorApi {
  getVendor() {
    const vendor = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/static/mock-images/avatars/avatar-maggie_chen.png',
      email: 'contact@qomotax.com',
      phone: '408 378 2300',
      title: 'Ms',
      name: 'QomoTax',
      firstName: 'Tax',
      lastName: 'Taxson',
      password: 'Password123!',
      plan: 'Premium',
      address1: '880 E Campbell Ave',
      zipCode: '95008',
      city: 'Campbell',
      state: 'California',
      country: 'United States'
    };

    return Promise.resolve(vendor);
  }
}

export const vendorApi = new VendorApi();
