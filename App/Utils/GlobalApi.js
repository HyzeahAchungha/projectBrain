import { gql, request } from "graphql-request/build/entrypoints/main";

const MASTER_URL =
  "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cly41q495019p07w1lhz1fw8y/master";
const getSlider = async () => {
  const query = gql`
    query MyQuery {
      sliders {
        id
        name
        image {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getCategories = async () => {
  const query = gql`
    query GetCategory {
      categories {
        id
        name
        icons {
          url
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};


const getBusinessList= async()=>{
  const query = gql`
    query GetBusinessList {
  businessLists {
    id
    name
    email
    contactPerson
    category {
      name
    }
    address
    about
    images {
      url
    }
  }
}
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const getBusinessListByCategory= async(category)=>{
  const query=gql`
  query GetBusinessList {
  businessLists (where: {category:{name:"`+category+`"}}){
    id
    name
    email
    contactPerson
    category {
      name
    }
    address
    about
    images{
      url
    }
  }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const createBooking=async(data)=>{
  const mutation = gql`
  mutation createBooking {
  createBooking(
    data: {bookingStatus: Booked,
     businessList: {connect: {id: "`+data.businessId+`"}},
      date: "`+data.date+`",
       time: "`+data.time+`",
       userEmail: "`+data.userEmail+`",
        userName: "`+data.userName+`",}
  ) {
    id
  }
  publishManyBookings(to: PUBLISHED) {
    count
  }
}
  `;
  const result = await request(MASTER_URL, mutation);
  return result;
}


const getUserBookings= async (userEmail) => {
const userBooking =gql`
query GetUserBookings {
  bookings(orderBy: updatedAt_DESC, 
  where: {userEmail: "`+userEmail+`"}) {
    time
    userEmail
    userName
    bookingStatus
    date
    id
    businessList {
      id
      images {
        url
      }
      name
      address
      contactPerson
      email
      about
    }
  }
}

`
try {
  const result = await request(MASTER_URL, userBooking);
  return result;
} catch (error) {
  console.error("Error fetching bookings:", error);
  // Handle the error (e.g., display an error message to the user)
}
}


export default {
  getSlider,
  getCategories,
  getBusinessList,
  getBusinessListByCategory,
  createBooking,
  getUserBookings
};
