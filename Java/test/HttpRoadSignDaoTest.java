import org.junit.*;

import java.io.BufferedReader;
import java.io.InputStream;
import org.json.JSONObject;
import org.skyscreamer.jsonassert.JSONAssert;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class HttpRoadSignDaoTest {
    HttpRoadSignDao httpRoadSignDao = new HttpRoadSignDao();
    double lat = 63.365330;
    double lon = 10.372574;
    int sign_id = 7644;

    /**
     * Integration test
     * @throws Exception throws connection and ioexceptions
     */
    @Test
    public void testGetBoundingBox() throws Exception{
        InputStream input = getClass().getResourceAsStream("SingleSign.json");
        BufferedReader reader = new BufferedReader(new InputStreamReader(input, StandardCharsets.ISO_8859_1));
        StringBuilder sb = new StringBuilder();
        String str;
        while((str = reader.readLine()) != null){
            sb.append(str);
        }

        JSONObject expected = new JSONObject(sb.toString());
        JSONObject result = new JSONObject(httpRoadSignDao.getBoundingBox(lat, lon, sign_id, 500).get(0).toString());
        JSONAssert.assertEquals(expected, result, false);
    }
}
